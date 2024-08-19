import { useCallback } from 'react';

export default function useKakaoAuth() {
  const startKakaoAuth = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        reject(new Error('NEXT_PUBLIC_BASE_URL is not defined'));
        return;
      }

      if (window.Kakao && window.Kakao.Auth) {
        try {
          window.Kakao.Auth.authorize({
            redirectUri: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error('Kakao SDK not loaded'));
      }
    });
  }, []);

  return startKakaoAuth;
}
