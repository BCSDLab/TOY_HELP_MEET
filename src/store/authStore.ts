import { create } from 'zustand';

interface User {
  id: number;
  kakaoId: string;
  name: string | null;
  profileImageUrl: string | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
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
}));
