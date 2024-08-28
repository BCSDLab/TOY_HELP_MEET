import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET!;

export function generateAccessToken(userId: number): string {
  return sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}

export function generateRefreshToken(userId: number): string {
  return sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string): { userId: number } | null {
  try {
    const decoded = verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string): { userId: number } | null {
  try {
    const decoded = verify(token, JWT_REFRESH_SECRET) as { userId: number };
    return decoded;
  } catch (error) {
    return null;
  }
}
