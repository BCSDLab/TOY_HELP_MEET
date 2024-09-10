import { AuthenticatedRequest, withApiAuth } from '@/lib/authMiddleware';
import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/utils/api';

interface FriendDetail {
  id: number;
  name: string | null;
  profileImageUrl: string | null;
}

async function getFriend(userId: number, friendId: number): Promise<ApiResponse<FriendDetail>> {
  try {
    const friend = await prisma.friend.findFirst({
      where: {
        userId: userId,
        friendId: friendId,
      },
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

    if (!friend) {
      return { success: false, message: 'Friend not found.' };
    }

    return {
      success: true,
      data: friend.friend,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch friend.',
    };
  }
}

async function deleteFriend(userId: number, friendId: number): Promise<ApiResponse<null>> {
  try {
    await prisma.friend.deleteMany({
      where: {
        userId: userId,
        friendId: friendId,
      },
    });

    return {
      success: true,
      message: 'Friend successfully removed.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to remove friend.',
    };
  }
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const userId = req.userId;
  const friendId = parseInt(req.query.friendId as string, 10);

  if (isNaN(friendId)) {
    return res.status(400).json({ success: false, message: 'Invalid friend ID.' });
  }

  switch (req.method) {
    case 'GET':
      const getResult = await getFriend(userId, friendId);
      res.status(getResult.success ? 200 : 404).json(getResult);
      break;

    case 'DELETE':
      const deleteResult = await deleteFriend(userId, friendId);
      res.status(deleteResult.success ? 200 : 400).json(deleteResult);
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}

export default withApiAuth(handler);
