import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccessToken, verifyRefreshToken, generateAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

export interface AuthenticatedRequest extends NextApiRequest {
  userId: number;
}

export function withApiAuth(handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'No authentication token provided.' });
    }

    try {
      let decoded = verifyAccessToken(accessToken);
      let newAccessToken = null;

      if (!decoded && refreshToken) {
        const refreshDecoded = verifyRefreshToken(refreshToken);

        if (refreshDecoded && typeof refreshDecoded.userId === 'number') {
          const user = await prisma.user.findUnique({ where: { id: refreshDecoded.userId } });

          if (user && user.refreshToken === refreshToken) {
            newAccessToken = generateAccessToken(user.id);
            decoded = { userId: user.id };

            res.setHeader('Set-Cookie', [
              `access_token=${newAccessToken}; HttpOnly; Path=/; Max-Age=${60 * 15}; SameSite=Strict`,
            ]);
          }
        }
      }

      if (!decoded || typeof decoded.userId !== 'number') {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
      }

      req.userId = decoded.userId;

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ success: false, message: 'An error occurred during authentication.' });
    }
  };
}
