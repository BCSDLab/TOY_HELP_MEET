import Image from 'next/image';
import { useRouter } from 'next/router';
import withAuth from '@/components/auth/withAuth';
import { LoadingDots } from '@/hooks/useLoading';
import { useAuthStore } from '@/store/authStore';

function Profile() {
  const router = useRouter();
  const { user } = useAuthStore();

  if (!user) {
    return <LoadingDots />;
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">프로필</h1>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          {user.profileImageUrl && (
            <Image
              src={user.profileImageUrl}
              alt={user.name || '프로필 이미지'}
              width={100}
              height={100}
              className="mr-4 rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-semibold">{user.name || '이름 없음'}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
