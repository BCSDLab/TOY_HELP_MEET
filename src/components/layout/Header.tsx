import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { user, isAuthenticated, clearUser } = useAuthStore();

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link href="/me">Dashboard</Link>
            <span>Welcome, {user?.name || 'User'}!</span>
            <button onClick={clearUser}>Logout</button>
          </>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
