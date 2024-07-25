import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BottomNavigation() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t">
      <ul className="flex justify-around items-center h-14">
        <li className={router.pathname === '/dutch-pay' ? 'text-blue-500' : ''}>
          <Link href="/dutch-pay" className="flex flex-col items-center p-2">
            <span className="text-2xl">💰</span>
            <span className="text-xs mt-1">더치페이</span>
          </Link>
        </li>
        <li className={router.pathname === '/dutch-pay' ? 'text-blue-500' : ''}>
          <Link href="/roulette" className="flex flex-col items-center p-2">
            <span className="text-2xl">🎡</span>
            <span className="text-xs mt-1">룰렛</span>
          </Link>
        </li>
        <li className={router.pathname === '/dutch-pay' ? 'text-blue-500' : ''}>
          <Link href="/where-to-meet" className="flex flex-col items-center p-2">
            <span className="text-2xl">📍</span>
            <span className="text-xs mt-1">만날 곳</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
