import { RouletteProvider } from '../../context/RouletteContext';
import RouletteOptionPage from './options';
import RoulettePage from './roulette-page';
import { useState, useEffect } from 'react';
import Router from 'next/router';

export default function Roulette() {
  const [showRoulettePage, setShowRoulettePage] = useState(false);

  useEffect(() => {
    if (showRoulettePage) {
      Router.push('/roulette?page=roulette', undefined, { shallow: true });
    } else {
      Router.push('/roulette?page=options', undefined, { shallow: true });
    }
  }, [showRoulettePage]);

  const handleGoBack = () => {
    if (showRoulettePage) {
      setShowRoulettePage(false);
    } else {
      Router.push('/');
    }
  };

  return (
    <RouletteProvider>
      <div className="flex w-full justify-between p-4">
        <button type="button" onClick={handleGoBack}>
          이전
        </button>
        {showRoulettePage && <button type="button">엑스</button>}
      </div>
      <div className="relative flex h-[calc(100vh-50px)] flex-col px-5">
        <div className="mb-16 flex justify-center text-4xl font-semibold">룰렛 돌리기</div>
        {showRoulettePage ? (
          <RoulettePage onGoBack={() => setShowRoulettePage(false)} />
        ) : (
          <RouletteOptionPage onProceed={() => setShowRoulettePage(true)} />
        )}
      </div>
    </RouletteProvider>
  );
}
