import { User } from '@prisma/client';
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { KakaoTokenResponse } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { code } = req.body;

  try {
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token');
    }

    const tokenData: KakaoTokenResponse = await tokenResponse.json();

    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();

    const {
      id: kakaoId,
      kakao_account: {
        profile: { nickname: name, thumbnail_image_url: profileImageUrl },
      },
    } = userData;

    const user: User = await prisma.user.upsert({
      where: { kakaoId: String(kakaoId) },
      update: {
        name,
        profileImageUrl,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      },
      create: {
        kakaoId: String(kakaoId),
        name,
        profileImageUrl,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        tokenExpiresAt: new Date(Date.now() + tokenData.expires_in * 1000),
      },
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.setHeader('Set-Cookie', [
      `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=${60 * 15}; SameSite=Strict`,
      `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`,
    ]);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error caught 500:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
