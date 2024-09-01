import { AuthenticatedRequest, withApiAuth } from '@/lib/authMiddleware';
import prisma from '@/lib/prisma';
import type { NextApiResponse } from 'next';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const user = await prisma.user.findUnique({ where: { id: req.userId } });

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
}

export default withApiAuth(handler);