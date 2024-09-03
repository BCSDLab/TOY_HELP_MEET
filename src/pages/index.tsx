import Link from 'next/link';
import UserIcon from '@/assets/svg/user.svg';
import RouletteIcon from '@/assets/svg/roulette_home.svg';
import IceBreakingIcon from '@/assets/svg/ice-breaking_home.svg';
import WhereMeetIcon from '@/assets/svg/where-meet_home.svg';
import DutchPayIcon from '@/assets/svg/dutchpay_home.svg';
import { useRouter } from 'next/router';

const HOME_INDEX = [
  {
    id: '/roulette',
    title: '룰렛돌리기',
    icon: <RouletteIcon className="shrink-0" />,
  },
  {
    id: '/dutch-pay',
    title: '더치페이',
    icon: <DutchPayIcon className="shrink-0" />,
  },
  {
    id: '/where-to-meet',
    title: '만날 위치',
    icon: <WhereMeetIcon className="shrink-0" />,
  },
  {
    id: '/ice-breaking',
    title: '아이스브레이킹',
    icon: <IceBreakingIcon className="shrink-0" />,
  },
];

function Block({ data }: { data: { id: string; title: string; icon: JSX.Element } }) {
  return (
    <div className="flex h-[110px] w-full items-center gap-2 rounded-[20px] bg-white px-5 py-5">
      {data.icon}
      <div className="flex h-full flex-col gap-3 overflow-hidden">
        <div className="text-[20px] font-medium">{data.title}</div>
        <div className="line-clamp-3 whitespace-pre-wrap text-[12px] font-extralight text-[#7d7d7d]">
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 px-10 py-14">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[36px] font-semibold">선택하시오!</div>
        <Link href={'/user'}>
          <UserIcon className="size-[35px]" />
        </Link>
      </div>
      {HOME_INDEX.map((data) => (
        <Link key={data.id} href={data.id}>
          <Block data={data} />
        </Link>
      ))}
    </div>
  );
}
