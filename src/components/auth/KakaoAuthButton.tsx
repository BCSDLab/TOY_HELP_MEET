import Image from 'next/image';
import kakaoLoginButton from '@/assets/images/kakao_login_large_narrow.png';
import useKakaoAuthorize from '@/hooks/kakao/useKakaoAuth';

export default function KakaoAuthButton() {
  const { kakaoAuthorize } = useKakaoAuthorize();

  const handleLogin = async () => {
    try {
      await kakaoAuthorize();
    } catch (error) {
      console.error('Kakao login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full max-w-[175px] cursor-pointer border-0 bg-transparent p-0"
    >
      <Image src={kakaoLoginButton} alt="카카오 로그인" priority={true} className="h-auto w-full" />
    </button>
  );
}
