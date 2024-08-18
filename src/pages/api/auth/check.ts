import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ isAuthenticated: false, message: 'No authentication token provided.' });
  }

  try {
    let decoded = verifyAccessToken(accessToken);
    let newAccessToken = null;

    // 액세스 토큰이 만료되었고 리프레시 토큰이 있는 경우
    if (!decoded && refreshToken) {
      const refreshDecoded = verifyRefreshToken(refreshToken);

      if (refreshDecoded && typeof refreshDecoded.userId === 'number') {
        const user = await prisma.user.findUnique({ where: { id: refreshDecoded.userId } });

        if (user && user.refreshToken === refreshToken) {
          // 새 액세스 토큰 생성
          newAccessToken = generateAccessToken(user.id);
          decoded = { userId: user.id };

          // 쿠키에 새 액세스 토큰 설정
          res.setHeader('Set-Cookie', [
            `access_token=${newAccessToken}; HttpOnly; Path=/; Max-Age=${60 * 15}; SameSite=Strict`,
          ]);
        }
      }
    }

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
      tokenRefreshed: !!newAccessToken,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res
      .status(401)
      .json({ isAuthenticated: false, message: 'An error occurred during authentication check.' });
  }
}
