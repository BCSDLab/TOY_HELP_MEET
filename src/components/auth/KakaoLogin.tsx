import { useState, useEffect } from 'react';
import Image from 'next/image';
import kakaoLoginButton from '@/assets/images/kakao_login_large_narrow.png';

export default function KakaoLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    if (window.Kakao && window.Kakao.Auth) {
      try {
        const status = await window.Kakao.Auth.getStatusInfo();
        if ('statusInfo' in status) {
          setIsLoggedIn(status.statusInfo.status === '로그인 상태');
        } else {
          console.error('Unexpected response format:', status);
        }
      } catch (error) {
        console.error('Failed to get login status:', error);
      }
    }
  };

  const handleLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}`,
      });
    } else {
      console.error('Kakao SDK not loaded');
    }
  };

  const handleLogout = async () => {
    if (window.Kakao && window.Kakao.Auth) {
      try {
        await window.Kakao.Auth.logout();
        setIsLoggedIn(false);
        console.log('Successfully logged out');
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div>
      {!isLoggedIn ? (
        <button
          onClick={handleLogin}
          className="w-full max-w-[175px] p-0 border-0 cursor-pointer bg-transparent"
        >
          <Image
            src={kakaoLoginButton}
            alt="카카오 로그인"
            priority={true}
            className="w-full h-auto"
          />
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-black transition-colors bg-yellow-400 rounded hover:bg-yellow-500"
        >
          카카오 로그아웃
        </button>
      )}
    </div>
  );
}
