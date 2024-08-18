import { verifyToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);

    if (decoded === null) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { refreshToken: null, accessToken: null, tokenExpiresAt: null },
    });

    res.setHeader('Set-Cookie', [
      'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
    ]);

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
