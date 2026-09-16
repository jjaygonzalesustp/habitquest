-- ============================================================================
-- HabitQuest — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. profiles
--    One row per student/admin, keyed to auth.users. Created automatically
--    on sign-up by the handle_new_user trigger below.
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  account text not null unique,
  name text not null,
  course text not null default '',
  year text not null default '',
  subject text not null default '',
  section text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  profile_image text,
  must_reset_password boolean not null default false,
  enrolled_subjects text[] not null default array[
    'Digital Electronics', 'Internet of Things', 'Physics for Automotive', 'Automotive Trivia'
  ],
  created_at timestamptz not null default now()
);

-- Safe to re-run: adds the column (backfilled with the default for existing
-- rows) if this project's profiles table predates subject-gating.
alter table public.profiles
  add column if not exists enrolled_subjects text[] not null default array[
    'Digital Electronics', 'Internet of Things', 'Physics for Automotive', 'Automotive Trivia'
  ];

-- ----------------------------------------------------------------------------
-- 2. activity_log
--    One row per quest / question-set attempt (daily quest, surprise quiz).
-- ----------------------------------------------------------------------------
create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  time_and_date text not null,
  correct_answers integer not null default 0,
  attempts integer not null default 0,
  subject text not null,
  day integer not null default 0,
  tab_switches integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists activity_log_user_id_idx on public.activity_log (user_id);

-- ----------------------------------------------------------------------------
-- 3. user_progress
--    One row per student: monthly progress % and the list of completed quests.
-- ----------------------------------------------------------------------------
create table if not exists public.user_progress (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  monthly_progress numeric not null default 0,
  completed_quests jsonb not null default '[]'::jsonb,
  last_updated timestamptz not null default now()
);

-- ============================================================================
-- Helper: is_admin() — used inside RLS policies. SECURITY DEFINER so it can
-- read profiles regardless of the caller's own row-level access.
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================================
-- Trigger: create a profile row automatically when someone signs up via
-- Supabase Auth. Registration data is passed in via auth options.data.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, account, name, course, year, subject, section)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'account', new.id::text),
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'course', ''),
    coalesce(new.raw_user_meta_data ->> 'year', ''),
    coalesce(new.raw_user_meta_data ->> 'subject', ''),
    coalesce(new.raw_user_meta_data ->> 'section', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- RPC: update_own_avatar — lets a signed-in student update ONLY their own
-- profile_image, without granting a broad "update own row" policy that could
-- be abused to change account/role.
-- ============================================================================
create or replace function public.update_own_avatar(new_url text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles set profile_image = new_url where id = auth.uid();
end;
$$;

-- ============================================================================
-- RPC: clear_must_reset_password — called after a student sets a new
-- password following an admin-triggered reset.
-- ============================================================================
create or replace function public.clear_must_reset_password()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles set must_reset_password = false where id = auth.uid();
end;
$$;

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.activity_log enable row level security;
alter table public.user_progress enable row level security;

-- profiles ---------------------------------------------------------------
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "profiles_delete_admin" on public.profiles;
create policy "profiles_delete_admin" on public.profiles
  for delete using (public.is_admin());

-- No direct insert policy: rows are created only by the handle_new_user
-- trigger (SECURITY DEFINER), so students can never set their own role.

-- activity_log -------------------------------------------------------------
drop policy if exists "activity_select_own_or_admin" on public.activity_log;
create policy "activity_select_own_or_admin" on public.activity_log
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "activity_insert_own" on public.activity_log;
create policy "activity_insert_own" on public.activity_log
  for insert with check (user_id = auth.uid());

drop policy if exists "activity_admin_all" on public.activity_log;
create policy "activity_admin_all" on public.activity_log
  for all using (public.is_admin()) with check (public.is_admin());

-- user_progress --------------------------------------------------------
drop policy if exists "progress_select_own_or_admin" on public.user_progress;
create policy "progress_select_own_or_admin" on public.user_progress
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "progress_insert_own" on public.user_progress;
create policy "progress_insert_own" on public.user_progress
  for insert with check (user_id = auth.uid());

drop policy if exists "progress_update_own" on public.user_progress;
create policy "progress_update_own" on public.user_progress
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "progress_admin_all" on public.user_progress;
create policy "progress_admin_all" on public.user_progress
  for all using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- Storage bucket for profile avatars
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatar_public_read" on storage.objects;
create policy "avatar_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatar_owner_write" on storage.objects;
create policy "avatar_owner_write" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatar_owner_update" on storage.objects;
create policy "avatar_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ============================================================================
-- After running this file, make your own account an admin from the SQL
-- Editor (replace with the account you registered in the app):
--
--   update public.profiles set role = 'admin' where account = 'your_account';
-- ============================================================================
