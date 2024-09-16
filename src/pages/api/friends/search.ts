import { AuthenticatedRequest, withApiAuth } from '@/lib/authMiddleware';
import type { NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { ApiResponse } from '@/types/api/api';

interface SearchResult {
  id: number;
  name: string | null;
  profileImageUrl: string | null;
}

async function searchFriends(userId: number, searchTerm: string): Promise<ApiResponse<SearchResult[]>> {
  try {
    const userFriends = await prisma.friend.findMany({
      where: { userId: userId },
      select: { friendId: true },
    });
    const friendIds = new Set(userFriends.map(f => f.friendId));

    const searchResults = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            OR: [
              { name: { contains: searchTerm.toLowerCase() } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        profileImageUrl: true,
      },
    });

    return {
      success: true,
      data: searchResults,
    };
  } catch (error) {
    console.error('Friend search error:', error);
    return {
      success: false,
      message: 'Failed to search friends.',
    };
  }
}

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const userId = req.userId;
  const searchTerm = req.query.query as string;

  if (!searchTerm || typeof searchTerm !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid search term.' });
  }

  const result = await searchFriends(userId, searchTerm);
  res.status(result.success ? 200 : 500).json(result);
}

export default withApiAuth(handler);
