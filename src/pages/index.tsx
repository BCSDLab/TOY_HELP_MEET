import Link from 'next/link';
import UserIcon from '@/assets/svg/user.svg'
import RouletteIcon from '@/assets/svg/roulette_home.svg'
import IceBreakingIcon from '@/assets/svg/ice-breaking_home.svg'
import WhereMeetIcon from '@/assets/svg/where-meet_home.svg'
import DutchPayIcon from '@/assets/svg/dutchpay_home.svg'

const HOME_INDEX = [
  {
    id: '/roulette',
    title: '룰렛돌리기',
    icon:<RouletteIcon className='shrink-0'/>,
  },
  {
    id: '/dutch-pay',
    title: '더치페이',
    icon:<DutchPayIcon className='shrink-0'/>,
  },
  {
    id: '/where-to-meet',
    title: '만날 위치',
    icon:<WhereMeetIcon className='shrink-0'/>,
  },
  {
    id: "/ice-breaking",
    title: "아이스브레이킹",
    icon:<IceBreakingIcon className='shrink-0'/>,
  },
];

function Block({ data }: { data: { id: string; title: string; icon:JSX.Element }; }){
  return (
    <div className='w-full bg-white h-[110px] flex items-center gap-2 py-5 px-5 rounded-[20px]'>
        {data.icon}
      <div className='flex flex-col gap-3 h-full overflow-hidden '>
        <div className='text-[20px] font-medium'>{data.title}</div>
        <div className='whitespace-pre-wrap font-extralight text-[12px] text-[#7d7d7d] line-clamp-3'>
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
          게임설명란 게임설명란 게임설명란 
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
          게임설명란 게임설명란 게임설명란 
          게임설명란 게임설명란 게임설명란 게임설명란 게임설명란
          게임설명란 게임설명란 게임설명란 
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col gap-5 px-10 py-14">
      <div className='flex justify-between items-center mb-2'>
        <div className='font-semibold text-[36px]'>선택하시오!</div>
        <UserIcon />
      </div>
      {HOME_INDEX.map((data) => (
        <Link key={data.id} href={data.id}>
          <Block data={data}/>
        </Link>
      ))}
    </div>
  );
}
