import React, { useState} from 'react';
import { useRouter } from 'next/router';
import RoletteOptionPage from '@/pages/roulette/RoletteOptionPage';
import RoulettePage from '@/pages/roulette/RoulettePage';

interface OptionProps {
  id: number;
  value: string;
}

function Rolette3D() {
  const router = useRouter();

  const initialOptions: OptionProps[] = Array(2)
    .fill(null)
    .map((_, index) => ({ id: index + 1, value: '' }));
  
  const [options, setOptions] = useState<OptionProps[]>(initialOptions);
  const [allFilled, setAllFilled] = useState<boolean>(false);
  const [openRoulette, setOpenRoulette] = useState<boolean>(false);

  const handleOpenRoulette = () => {
    setOpenRoulette(true);
  };

  const handleReset = () => {
    router.back();
  };

  return (
    <div className="flex h-full pt-14 flex-col bg-bg px-5">
      <div className="flex justify-center text-4xl font-semibold mb-16">룰렛 돌리기</div>
      {
        openRoulette ? (
          <RoulettePage options={options} />
        ) : (
          <RoletteOptionPage
            options={options} 
            setOptions={setOptions}
            allFilled={allFilled}
            setAllFilled={setAllFilled}
            setOpenRoulette={handleOpenRoulette}
          />
        )
      }
      {!openRoulette && (
        <button onClick={handleReset}>이전</button>
      )}
    </div>
  );
};

export default Rolette3D;
