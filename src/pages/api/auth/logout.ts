import { verifyAccessToken, verifyRefreshToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken && !refreshToken) {
    return res.status(400).json({ success: false, message: 'No tokens provided' });
  }

  try {
    let userId: number | null = null;

    // 액세스 토큰 확인
    if (accessToken) {
      const decodedAccess = verifyAccessToken(accessToken);
      if (decodedAccess) {
        userId = decodedAccess.userId;
      }
    }

    // 액세스 토큰이 유효하지 않다면 리프레시 토큰 확인
    if (!userId && refreshToken) {
      const decodedRefresh = verifyRefreshToken(refreshToken);
      if (decodedRefresh) {
        userId = decodedRefresh.userId;
      }
    }

    if (!userId) {
      return res.status(400).json({ success: false, message: 'Invalid tokens' });
    }

    // 데이터베이스에서 토큰 정보 삭제
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null, accessToken: null, tokenExpiresAt: null },
    });

    // 쿠키에서 토큰 제거
    res.setHeader('Set-Cookie', [
      'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
      'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
    ]);

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
