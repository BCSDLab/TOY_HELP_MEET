import { create } from 'zustand';
import { UserDTO } from '@/types';

interface AuthState {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserDTO | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  checkAuth: () => Promise<void>;
  login: (code: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  initializeTokenRefresh: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoading: (isLoading) => set({ isLoading }),
  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      set({
        isAuthenticated: data.isAuthenticated,
        user: data.isAuthenticated ? data.user : null,
        isLoading: false,
      });
    } catch (error) {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
  login: async (code: string) => {
    try {
      const response = await fetch('/api/auth/kakao-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const { id, kakaoId, name, profileImageUrl, phoneNumber } = result.data;
        set({
          user: { id, kakaoId, name, profileImageUrl, phoneNumber },
          isAuthenticated: true,
        });

        get().initializeTokenRefresh();

        return Promise.resolve();
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ isAuthenticated: false, user: null });
      return Promise.reject(error);
    }
  },
  logout: async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        set({ user: null, isAuthenticated: false });
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  refreshToken: async () => {
    try {
      const response = await fetch('/api/auth/refresh-token', { method: 'POST' });
      if (response.ok) {
        await get().checkAuth();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  },
  initializeTokenRefresh: () => {
    const refreshInterval = setInterval(
      async () => {
        const isRefreshed = await get().refreshToken();
        if (!isRefreshed) {
          clearInterval(refreshInterval);
          set({ isAuthenticated: false, user: null });
        }
      },
      14 * 60 * 1000
    );

    return () => clearInterval(refreshInterval);
  },
}));
