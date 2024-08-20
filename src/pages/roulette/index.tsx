import { RouletteProvider } from '../../context/RouletteContext';
import RouletteOptionPage from './options';
import RoulettePage from './roulette-page';
import { useState } from 'react';

export default function Roulette() {
  const [showRoulettePage, setShowRoulettePage] = useState(false);

  return (
    <RouletteProvider>
      <div className="relative flex h-screen flex-col px-5 pt-14">
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
