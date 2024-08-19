import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import kakaoLoginButton from '@/assets/images/kakao_login_large_narrow.png';
import useKakaoAuth from '@/hooks/auth/useKakaoAuth';
import { LoadingDots } from '@/hooks/useLoading';

export default function KakaoAuthButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const startKakaoAuth = useKakaoAuth();

  const handleLogin = async () => {
    try {
      await startKakaoAuth();
    } catch (error) {
      console.error('Kakao login failed:', error);
    }
  };

  const handleCallback = async (code: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/kakao-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (typeof window !== 'undefined') {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      handleCallback(code);
      return <LoadingDots />;
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="w-full max-w-[175px] cursor-pointer border-0 bg-transparent p-0"
    >
      <Image src={kakaoLoginButton} alt="카카오 로그인" priority={true} className="h-auto w-full" />
    </button>
  );
}
