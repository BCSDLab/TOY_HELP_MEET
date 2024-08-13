import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { user, isAuthenticated, clearUser } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
              Home
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/me"
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-800"
                >
                  My Page
                </Link>
                <span className="text-gray-600">
                  Welcome, <span className="font-semibold">{user?.name || 'User'}</span>!
                </span>
                <button
                  onClick={clearUser}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
