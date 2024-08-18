import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { ApiResponse } from '@/types/api/ApiResponse';
import { UserResponse } from '@/types/auth/user';

export default function Callback() {
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();

  const sendCodeToServer = useCallback(
    async (code: string) => {
      try {
        const response = await fetch('/api/auth/kakao-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const result: ApiResponse<UserResponse> = await response.json();

        if (result.success && result.data) {
          const { id, kakaoId, name, profileImageUrl } = result.data;
          setUser({
            id,
            kakaoId,
            name,
            profileImageUrl,
          });
          setIsAuthenticated(true);

          useAuthStore.getState().initializeTokenRefresh();

          router.push('/me');
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

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      sendCodeToServer(code as string);
    }
  }, [router.query, sendCodeToServer]);

  return <div>로그인 처리 중...</div>;
}
