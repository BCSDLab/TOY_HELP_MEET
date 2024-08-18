import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Layout from '@/components/layout/AppLayout';
import Header from '@/components/layout/Header';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useKakaoInit } from '@/hooks/auth/useKakaoInit';
import { useLoadingComponent } from '@/hooks/useLoading';
import { useAuthStore } from '@/store/authStore';
import '@/styles/globals.css';

const PretendardVariable = localFont({ src: '../../src/assets/fonts/PretendardVariable.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuthStore();

  useKakaoInit();
  useAuthCheck();
  useLoadingComponent(isLoading);

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
