# HabitQuest

A mobile-first gamified learning platform: daily quests across four technical
subjects, progress tracking, surprise quizzes, computed grades, and an admin
dashboard for monitoring students.

**Stack:** React + Vite (frontend) · Supabase (auth, database, storage) ·
Vercel (hosting + serverless admin API).

This folder is a ready-to-deploy copy of the app. **See
[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for the full, step-by-step setup
of Supabase → GitHub → Vercel.**

## What changed from the original Figma/Google Sheets version

- **Database**: Google Sheets → Supabase Postgres (`profiles`, `activity_log`,
  `user_progress` tables — see [supabase/schema.sql](./supabase/schema.sql)).
- **Auth**: plain-text password matching → Supabase Auth (hashed passwords,
  real sessions). Student "accounts" are mapped to a synthetic email
  internally, so no real email address is required at sign-up.
- **Grades**: the old manually-maintained "Grades" sheet is gone. Grades are
  now computed live from `activity_log` + `user_progress`
  (see `getUserGrades` in
  [src/app/services/dataService.ts](./src/app/services/dataService.ts)).
- **Avatars**: base64-in-localStorage → uploaded to Supabase Storage, so
  profile photos now sync across devices.
- **New: Admin dashboard** at `/admin` — sign in with an admin account to
  view every student's account info, quest activity/attempts, and computed
  grades, and to edit account details, reset a password to the default
  `123456`, or delete an account.

## Local development

```bash
npm install
cp .env.example .env   # fill in your Supabase project values
npm run dev
```

The `/api/admin/*` serverless functions (password reset, account deletion)
only run on Vercel (or `vercel dev`) — they are not available under plain
`npm run dev` since Vite doesn't execute the `/api` folder.

## Project layout

```
src/app/
  pages/            student-facing pages (SignIn, Home, Quest, Grades, ...)
  pages/admin/       admin login, dashboard, route guard
  services/dataService.ts   all Supabase reads/writes (student + admin)
  lib/supabaseClient.ts     Supabase client + account→email mapping
api/admin/           Vercel serverless functions using the service-role key
supabase/schema.sql  full database schema, RLS policies, triggers
```
