import { AuthenticatedRequest, withApiAuth } from '@/lib/authMiddleware';
import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/utils/api';

interface Friend {
  id: number;
  name: string | null;
  profileImageUrl: string | null;
}

async function getFriends(userId: number): Promise<ApiResponse<Friend[]>> {
  try {
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

    return {
      success: true,
      data: friends.map((f) => f.friend),
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch friends.',
    };
  }
}

async function addFriend(userId: number, friendId: number): Promise<ApiResponse<any>> {
  if (!friendId || typeof friendId !== 'number') {
    return { success: false, message: 'Invalid friend ID.' };
  }

  try {
    const existingFriend = await prisma.friend.findFirst({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    if (existingFriend) {
      return { success: false, message: 'Already friends.' };
    }

    const newFriend = await prisma.friend.create({
      data: {
        userId: userId,
        friendId: friendId,
      },
    });

    return {
      success: true,
      data: newFriend,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to add friend.',
    };
  }
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const userId = req.userId;

  if (req.method === 'GET') {
    const result = await getFriends(userId);
    res.status(result.success ? 200 : 500).json(result);
  } else if (req.method === 'POST') {
    const { friendId } = req.body;
    const result = await addFriend(userId, friendId);
    res.status(result.success ? 201 : 400).json(result);
  }
}

export default withApiAuth(handler);
