import { useRouter } from 'next/router';
import Ice from '@/assets/svg/ice-breaking.svg';
import TopNavigation from '@/components/TopNavigation';

export default function IceBreaking() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-10">
      <TopNavigation />
      <div className="mt-10 flex flex-col items-center text-3xl font-semibold">
        아이스 브레이킹
        <span className="text-base font-normal">모임에서 사용해보세요!</span>
      </div>
      <div className="mt-[10vh] flex justify-center">
        <Ice />
      </div>
      <button
        className="fixed bottom-5 w-full max-w-sm cursor-pointer rounded-lg bg-[#3160D8] p-5 text-xl text-white"
        onClick={() => router.push('/ice-breaking/select')}
      >
        시작하기
      </button>
    </div>
  );
}
