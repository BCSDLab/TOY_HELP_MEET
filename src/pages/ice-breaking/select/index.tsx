import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Heart from '@/assets/svg/heart.svg';
import TopNavigation from '@/components/TopNavigation';

interface BlockProps {
  background: string;
  color: string;
  title: string;
  path: string;
}

function BlockButton({ background, color, title, path }: BlockProps) {
  const router = useRouter();

  const backgroundStyle = useMemo(() => {
    return background ? { backgroundColor: background } : {}
  },[background])

  const colorStyle = useMemo(() => {
    return color ? { color: color } : {}
  },[color])

  const fillStyle = useMemo(() => {
    return color ? { fill: color } : {}
  },[color])

  return (
    <button
      className={"relative flex w-full items-center justify-center rounded-[20px] after:block after:pb-[100%] after:content-['']"}
      style={backgroundStyle}
      type="button"
      onClick={()=>router.push(path)}
    >
      <div
        className={`absolute flex flex-col items-center gap-3 text-lg font-semibold`}
        style={colorStyle}
      >
        <Heart style={fillStyle} />
        {title}
      </div>
    </button>
  );
}

export default function Select() {  
  return (
    <>
      <TopNavigation />
      <div className="px-2" >
        <div className="mt-10 flex flex-col items-center text-3xl font-semibold">
          아이스 브레이킹
          <span className="text-base font-normal">모임에서 사용해보세요!</span>
        </div>
        <div className="grid w-full grid-cols-2 gap-6 rounded-xl bg-white p-3 mt-10">
          <BlockButton background="#FFDFDF" color="#DC5B5B" title="연인" path="/ice-breaking/select/couple"/>
          <BlockButton background="#CADFFF" color="#638CCB" title="친구" path="/ice-breaking/select/friend"/>
          <BlockButton background="#DEF4E1" color="#85B68D" title="직장" path="/ice-breaking/select/job"/>
          <BlockButton background="#FFEBCD" color="#CA9648" title="가족" path="/ice-breaking/select/family"/>
        </div>
      </div>
    </>
  );
}
