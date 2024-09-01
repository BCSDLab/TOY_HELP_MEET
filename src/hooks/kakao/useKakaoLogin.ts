import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { UserResponse } from '@/types';
import { fetchApi } from '@/utils/api';

export function useKakaoLogin() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();

  const kakaoLogin = useCallback(
    async (code: string) => {
      try {
        const result = await fetchApi<UserResponse>('/api/auth/kakao-login', 'POST', { code });

        if (result.success && result.data) {
          const { id, kakaoId, name, profileImageUrl } = result.data;
          setUser({ id, kakaoId, name, profileImageUrl });
          setIsAuthenticated(true);

          useAuthStore.getState().initializeTokenRefresh();

          router.push('/profile');
        } else {
          throw new Error(result.error || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    },
    [router, setUser, setIsAuthenticated]
  );

  return { kakaoLogin };
}
