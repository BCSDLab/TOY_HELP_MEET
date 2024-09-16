import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { useCallback } from 'react';

export default function useKakaoLogout() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      router.push('/');
    }
  }, [logout, router]);

  return { handleLogout };
}
