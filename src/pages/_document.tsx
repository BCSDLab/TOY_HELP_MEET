import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script
        src={`https://t1.kakaocdn.net/kakao_js_sdk/${process.env.NEXT_PUBLIC_KAKAO_SDK_VERSION}/kakao.min.js`}
        integrity={process.env.NEXT_PUBLIC_KAKAO_SDK_INTEGRITY}
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      ></Script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
