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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">내 프로필</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center">
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
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold">카카오 계정 정보</h3>
          <p>
            <strong>카카오 ID:</strong> {user.kakaoId}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold">계정 관리</h3>
          <button
            onClick={() => router.push('/profile/edit')}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            프로필 수정
          </button>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-semibold">계정 연결</h3>
          <p>카카오 계정으로 연결됨</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);
