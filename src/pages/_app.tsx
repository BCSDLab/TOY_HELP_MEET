import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Layout from '@/components/layout/AppLayout';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';

const PretendardVariable = localFont({ src: '../../src/assets/fonts/PretendardVariable.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className={`${PretendardVariable.className} flex min-h-screen items-center justify-center bg-[#fff]`}
    >
      <Layout>
        <Header />
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
