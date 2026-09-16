import { createClient } from '@supabase/supabase-js';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.error(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Set them in your .env file (see .env.example). ' +
      'The app will render, but sign-in and data will not work until these are set.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Accounts are plain usernames (e.g. "student001"), but Supabase Auth needs
 * an email. We map each account to a stable, non-routable synthetic email so
 * we can use Supabase Auth (hashed passwords, sessions, RLS via auth.uid())
 * without asking students for a real email address.
 */
export function accountToEmail(account: string): string {
  return `${account.trim().toLowerCase()}@habitquest.local`;
}
