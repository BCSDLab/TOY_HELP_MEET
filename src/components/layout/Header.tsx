import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">홈</Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/profile">프로필</Link>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link href="/auth/login">로그인</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
