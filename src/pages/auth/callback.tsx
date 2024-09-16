import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoadingDots } from '@/hooks/useLoading';
import { useKakaoLogin } from '@/hooks/kakao/useKakaoLogin';

export default function Callback() {
  const router = useRouter();
  const { handleLogin } = useKakaoLogin();

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      handleLogin(code as string);
    }
  }, [router.query, handleLogin]);

  return <LoadingDots />;
}
