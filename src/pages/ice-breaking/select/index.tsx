import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Heart from '@/assets/svg/heart.svg';
import TopNavigation from '@/components/TopNavigation';
import { QUESTION_TYPE, QuestionValue } from '@/pages/ice-breaking/\bentity';

interface BlockProps {
  background: string;
  color: string;
  title: string;
  path: string;
}

function BlockButton({ background, color, title, path }: BlockProps) {
  const router = useRouter();

  const backgroundStyle = useMemo(() => {
    return background ? { backgroundColor: background } : {};
  }, [background]);

  const colorStyle = useMemo(() => {
    return color ? { color: color } : {};
  }, [color]);

  const fillStyle = useMemo(() => {
    return color ? { fill: color } : {};
  }, [color]);

  return (
    <button
      className={
        "relative flex w-full items-center justify-center rounded-[20px] after:block after:pb-[100%] after:content-['']"
      }
      style={backgroundStyle}
      type="button"
      onClick={() => router.push(path)}
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
      <div className="px-2">
        <div className="mt-10 flex flex-col items-center text-3xl font-semibold">
          아이스 브레이킹
          <span className="text-base font-normal">모임에서 사용해보세요!</span>
        </div>
        <div className="mt-10 grid w-full grid-cols-2 gap-6 rounded-xl bg-white p-3">
          {Object.values(QUESTION_TYPE).map((type: QuestionValue) => (
            <BlockButton
              key={type.title}
              background={type.shadow}
              color={type.color}
              title={type.title}
              path={type.path}
            />
          ))}
        </div>
      </div>
    </>
  );
}
