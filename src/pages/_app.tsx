import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const PretendardVariable = localFont({ src: './assets/fonts/PretendardVariable.woff2' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={PretendardVariable.className}>
      <Component {...pageProps} />
    </main>
  );
}
