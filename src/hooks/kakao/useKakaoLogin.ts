import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

export function useKakaoLogin() {
  const { login } = useAuthStore();
  const router = useRouter();
  const { setUser, setIsAuthenticated } = useAuthStore();

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        await login(code);
      } catch (error) {
        console.error('Login error:', error);
        setIsAuthenticated(false);
        router.push('/auth/login');
      } finally {
        router.push('/');
      }
    },
    [router, setUser, setIsAuthenticated]
  );

  return { handleLogin };
}
