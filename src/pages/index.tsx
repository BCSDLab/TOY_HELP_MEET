import Link from 'next/link';
import Image from 'next/image';
import RouletteIcon from '@/assets/svg/roulette_home.svg';
import IceBreakingIcon from '@/assets/svg/ice-breaking_home.svg';
import WhereMeetIcon from '@/assets/svg/where-meet_home.svg';
import DutchPayIcon from '@/assets/svg/dutchpay_home.svg';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

const HOME_INDEX = [
  {
    id: '/roulette',
    title: '룰렛돌리기',
    icon: <RouletteIcon className="shrink-0" />,
    description: '게임설명란 게임설명란 게임설명란',
  },
  {
    id: '/dutch-pay',
    title: '더치페이',
    icon: <DutchPayIcon className="shrink-0" />,
    description: '게임설명란 게임설명란 게임설명란',
  },
  {
    id: '/where-to-meet',
    title: '만날 위치',
    icon: <WhereMeetIcon className="shrink-0" />,
    description: '게임설명란 게임설명란 게임설명란',
  },
  {
    id: '/ice-breaking',
    title: '아이스브레이킹',
    icon: <IceBreakingIcon className="shrink-0" />,
    description: '게임설명란 게임설명란 게임설명란',
  },
];

function Block({ data }: { data: { id: string; title: string; icon: JSX.Element, description: string } }) {
  const { title, icon, description } = data;
  return (
    <div className="flex h-[110px] w-full items-center gap-2 rounded-[20px] bg-white px-5 py-5">
      {icon}
      <div className="flex flex-col h-full gap-3 overflow-hidden">
        <div className="text-[20px] font-medium">{title}</div>
        <div className="line-clamp-3 whitespace-pre-wrap text-[12px] font-extralight text-[#7d7d7d]">
          {description}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-5 px-10 py-14">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[36px] font-semibold">선택하시오!</div>
        {user ? (
          <Link href={'/profile'}>
            <Image
              src={user.profileImageUrl || '/profile.png'}
              alt={user.name || '프로필 이미지'}
              width={35}
              height={35}
              className="rounded-full"
              priority
            />
          </Link>
        ) : (
          <Link href={'/auth/login'}>
            <button
              className="flex h-[35px] w-[69px] items-center justify-center rounded-[8px] bg-[#3160d8] text-[16px] font-medium text-white"
            >
              로그인
            </button>
          </Link>
        )}
      </div>
      {HOME_INDEX.map((data) => (
        <Link key={data.id} href={data.id}>
          <Block data={data} />
        </Link>
      ))}
    </div>
  );
}
