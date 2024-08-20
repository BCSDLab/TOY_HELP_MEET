import { verifyToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.auth_token;

  if (!token) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: 'No authentication token provided.' });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || typeof decoded.userId !== 'number') {
      return res.status(401).json({ isAuthenticated: false, message: 'Invalid token.' });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: 'User not found.' });
    }

    res.status(200).json({
      isAuthenticated: true,
      user: {
        id: user.id,
        kakaoId: user.kakaoId,
        name: user.name,
        profileImageUrl: user.profileImageUrl,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res
      .status(401)
      .json({ isAuthenticated: false, message: 'An error occurred during authentication check.' });
  }
}
