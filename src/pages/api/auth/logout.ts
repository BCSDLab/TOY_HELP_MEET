import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Set-Cookie', ['auth_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict']);

  res.status(200).json({ success: true, message: 'Logged out successfully' });
}
