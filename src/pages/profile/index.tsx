import Image from 'next/image';
import { useRouter } from 'next/router';
import withAuth from '@/components/auth/withAuth';
import { LoadingDots } from '@/hooks/useLoading';
import { useAuthStore } from '@/store/authStore';
import UserIcon from '@/assets/svg/user.svg';
import TopNavigation from '@/components/TopNavigation';
import Link from 'next/link';
import useKakaoLogout from '@/hooks/kakao/useKakaoLogout';

function Field({ title, data }: { title: string; data: string }) {
  return (
    <div className="flex flex-col gap-5 border-solid pt-10 text-[16px] first:pt-0">
      <div className="font-semibold text-[#3160d8]">{title}</div>
      <div className="font-medium">{data}</div>
    </div>
  );
}

function Profile() {
  const { user } = useAuthStore();
  const { handleLogout } = useKakaoLogout();

  if (!user) {
    return <LoadingDots />;
  }

  return (
    <>
      <TopNavigation path='/'/>
      <div className="flex flex-col items-center gap-10 p-5">
        <div className="flex items-center justify-between w-full">
          <div className="w-full text-[36px] font-semibold">회원정보</div>
          <button
            className="flex w-24 p-2 items-center justify-center rounded-[8px] text-[18px] font-medium text-[black]"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
        <div className="flex flex-col items-center gap-5">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={user.name || '프로필 이미지'}
              width={100}
              height={100}
              className="rounded-full"
              priority
            />
          ) : (
            <UserIcon className="size-[110px]" />
          )}
          <div className="text-[24px] font-semibold">
          {user.name || ''}<span className="ml-2 font-medium">님</span>
          </div>
        </div>

        <div className="group flex w-full flex-col gap-10 divide-y divide-[#d9d9d9] rounded-[20px] bg-white p-10">
          <Field title="닉네임" data="XXX" />
          <Field title="전화번호" data="010-XXXX-XXXX" />
          <Field title="계좌번호" data="XXXX-XXX-XXXXX" />
        </div>
        <div className="flex justify-end w-full">
          <Link
            className="flex h-[35px] w-[83px] items-center justify-center rounded-[8px] bg-[#3160d8] text-[18px] font-medium text-white"
            href={`/user/modify?nickName=${'XXX'}&phone=${'010-XXXX-XXXX'}&account=${'XXXX-XXX-XXXXX'}`}
          >
            수정하기
          </Link>
        </div>
      </div>
    </>
  );
}

export default withAuth(Profile);
