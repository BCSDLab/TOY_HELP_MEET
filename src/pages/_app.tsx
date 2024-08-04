import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

const PretendardVariable = localFont({ src: './assets/fonts/PretendardVariable.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${PretendardVariable.className} bg-[#fff] min-h-screen flex items-center justify-center`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
