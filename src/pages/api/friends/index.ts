import { AuthenticatedRequest, withApiAuth } from '@/lib/authMiddleware';
import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const userId = req.userId;

  if (req.method === 'GET') {
    // 친구 목록 조회
    const friends = await prisma.friend.findMany({
      where: { userId: userId },
      include: {
        friend: {
          select: {
            id: true,
            name: true,
            profileImageUrl: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: friends.map(f => f.friend),
    });
  } else if (req.method === 'POST') {
    // 친구 추가
    const { friendId } = req.body;

    if (!friendId || typeof friendId !== 'number') {
      return res.status(400).json({ success: false, message: 'Invalid friend ID.' });
    }

    // 이미 친구인지 확인
    const existingFriend = await prisma.friend.findFirst({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    if (existingFriend) {
      return res.status(400).json({ success: false, message: 'Already friends.' });
    }

    // 친구 추가
    const newFriend = await prisma.friend.create({
      data: {
        userId: userId,
        friendId: friendId,
      },
    });

    res.status(201).json({
      success: true,
      data: newFriend,
    });
  }
}

export default withApiAuth(handler);