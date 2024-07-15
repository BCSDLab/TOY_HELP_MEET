import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <div className="box-border flex h-14 w-lvw items-center border-b-2 border-black pl-10">
        <Link
          className="flex h-full items-center px-2 text-lg font-semibold hover:bg-button-blue hover:text-white"
          href={'/dutch-pay'}
        >
          더치페이
        </Link>
        <Link
          className="flex h-full items-center px-2 text-lg font-semibold hover:bg-button-blue hover:text-white"
          href={'/roulette'}
        >
          룰렛 돌리기
        </Link>
        <Link
          className="flex h-full items-center px-2 text-lg font-semibold hover:bg-button-blue hover:text-white"
          href={'/where-to-meet'}
        >
          어디서 만날까?
        </Link>
      </div>
    </main>
  );
}
