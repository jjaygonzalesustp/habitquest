import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin, verifyAdmin } from '../_lib/adminAuth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const auth = await verifyAdmin(req.headers.authorization);
  if (!auth.ok) {
    res.status(auth.status).json({ message: auth.message });
    return;
  }

  const { userId } = req.body || {};
  if (!userId || typeof userId !== 'string') {
    res.status(400).json({ message: 'userId is required' });
    return;
  }

  if (userId === auth.uid) {
    res.status(400).json({ message: 'You cannot delete your own admin account' });
    return;
  }

  // Deleting the auth user cascades to profiles / activity_log / user_progress
  // via the ON DELETE CASCADE foreign keys defined in supabase/schema.sql.
  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(200).json({ success: true });
}
