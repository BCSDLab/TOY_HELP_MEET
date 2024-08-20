import { useRouter } from 'next/router';
import Heart from '@/assets/svg/heart.svg';
import TopNavigation from '@/components/TopNavigation';

interface Question {
  couple: { title: string; color: string; shadow: string };
  friend: { title: string; color: string; shadow: string };
  job: { title: string; color: string; shadow: string };
  family: { title: string; color: string; shadow: string };
}

const QUESTION_TYPE: Question = {
  couple: {
    title: '연인',
    color: '#DC5B5B',
    shadow: '#FFDFDF',
  },
  friend: {
    title: '친구',
    color: '#638CCB',
    shadow: '#b8d2f9',
  },
  job: {
    title: '직장',
    color: '#85B68D',
    shadow: '#d1ffd9',
  },
  family: {
    title: '가족',
    color: '#CA9648',
    shadow: '#ffe5bf',
  },
};

export default function Page() {
  const router = useRouter();
  const selected = QUESTION_TYPE[router.query.type as keyof Question];

  return (
    <>
      <TopNavigation path="/ice-breaking/select" close />
      <div className="px-2">
        <div className="my-10 flex flex-col items-center gap-5" style={{ color: selected.color }}>
          <div className="text-3xl font-semibold">{selected.title}</div>
          카드를 선택한 당신!
        </div>
        <div
          className="border-1 border- flex min-h-[60vh] flex-col items-center justify-center gap-3 rounded-[20px] bg-white text-2xl font-semibold"
          style={{ boxShadow: `0 0 8px 0 ${selected.shadow}` }}
        >
          <Heart style={{ fill: `${selected.color}` }} />
          이것은 질문이여
        </div>
        <button
          className="fixed bottom-3 left-[50%] h-20 w-full max-w-sm translate-x-[-50%] bg-[#3160D8] text-2xl text-white rounded-lg"
          type="button"
        >
          다시뽑기
        </button>
      </div>
    </>
  );
}
