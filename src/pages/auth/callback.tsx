import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useKakaoLogin } from '@/hooks/kakao/useKakaoLogin';
import { LoadingDots } from '@/hooks/useLoading';

export default function Callback() {
  const router = useRouter();
  const { kakaoLogin } = useKakaoLogin();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      kakaoLogin(code as string);
    }
  }, [router.query, kakaoLogin]);

  return <LoadingDots />;
}
