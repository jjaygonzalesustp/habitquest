import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin, verifyAdmin } from '../_lib/adminAuth';

const DEFAULT_PASSWORD = '123456';

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

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: DEFAULT_PASSWORD,
  });

  if (updateError) {
    res.status(500).json({ message: updateError.message });
    return;
  }

  await supabaseAdmin.from('profiles').update({ must_reset_password: true }).eq('id', userId);

  res.status(200).json({ success: true });
}
