import { useState } from 'react';
import { useRouter } from 'next/router';
import Heart from '@/assets/svg/heart.svg';
import TopNavigation from '@/components/TopNavigation';
import { Question, QUESTION_LIST, QUESTION_TYPE } from '@/pages/ice-breaking/\bentity';

export default function Page() {
  const router = useRouter();
  const questionList = QUESTION_LIST[router.query.type as keyof Question]||[];
  const [index, setIndex] = useState(0);
  const selected = QUESTION_TYPE[router.query.type as keyof Question] || {};
  
  return (
    <>
      <TopNavigation path="/ice-breaking/select" close />
      <div className="px-2">
        <div className="my-10 flex flex-col items-center gap-5" style={{ color: selected.color }}>
          <div className="text-3xl font-semibold">{selected.title}</div>
          카드를 선택한 당신!
        </div>
        <div
          className="border-1 border- flex min-h-[60vh] px-5 flex-col items-center justify-center gap-3 rounded-[20px] bg-white text-2xl font-semibold break-keep text-center"
          style={{ boxShadow: `0 0 8px 0 ${selected.shadow}` }}
        >
          <Heart style={{ fill: `${selected.color}` }} />
          {questionList[index]}
        </div>
        <button
          className="fixed bottom-3 left-[50%] h-20 w-full max-w-sm translate-x-[-50%] rounded-lg bg-[#3160D8] text-2xl text-white"
          type="button"
          onClick={() => {
            if (index < questionList.length-1) setIndex(index + 1);
            else setIndex(0);        
          }}
        >
          다시뽑기
        </button>
      </div>
    </>
  );
}
