import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import kakaoLoginButton from '@/assets/images/kakao_login_large_narrow.png';

export default function KakaoLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/auth/callback`,
      });
    } else {
      console.error('Kakao SDK not loaded');
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

      router.push('/'); // 로그인 후 리다이렉트할 페이지
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
      return <div>로그인 처리 중...</div>;
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
