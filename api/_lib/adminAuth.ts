import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  // eslint-disable-next-line no-console
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY environment variables for admin API routes.');
}

/**
 * Service-role client. Bypasses Row Level Security — only ever used here,
 * server-side, after verifyAdmin() confirms the caller is an admin.
 */
export const supabaseAdmin = createClient(SUPABASE_URL || '', SERVICE_ROLE_KEY || '', {
  auth: { autoRefreshToken: false, persistSession: false },
});

/**
 * Verifies the bearer token in the request and confirms the caller's
 * profile has role = 'admin'. Returns the caller's user id on success.
 */
export async function verifyAdmin(authHeader: string | undefined): Promise<{ ok: true; uid: string } | { ok: false; status: number; message: string }> {
  if (!authHeader?.startsWith('Bearer ')) {
    return { ok: false, status: 401, message: 'Missing bearer token' };
  }

  const token = authHeader.slice('Bearer '.length);
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

  if (userError || !userData.user) {
    return { ok: false, status: 401, message: 'Invalid session' };
  }

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userData.user.id)
    .single();

  if (profileError || !profile || profile.role !== 'admin') {
    return { ok: false, status: 403, message: 'Admin access required' };
  }

  return { ok: true, uid: userData.user.id };
}
