import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
  const router = useRouter();

  const sendCodeToServer = useCallback(async (code: string) => {
    try {
      // 여기서는 자체 서버의 API 엔드포인트로 요청을 보냅니다.
      const response = await fetch('/api/kakao-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Login success:', data.user);
        router.push('/');
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }, [router]);

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      sendCodeToServer(code as string);
    }
  }, [router.query, sendCodeToServer]);

  return <div>로그인 처리 중...</div>;
}
