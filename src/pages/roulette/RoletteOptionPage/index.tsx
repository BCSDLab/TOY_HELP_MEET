import React, { useEffect, useState } from 'react';
import router from 'next/router';

interface OptionProps {
  id: number;
  value: string;
}

interface RoletteOptionPageProps {
  options: OptionProps[];
  setOptions: (options: OptionProps[]) => void;
  allFilled: boolean;
  setAllFilled: (allFilled: boolean) => void;
  setOpenRoulette: (openRoulette: boolean) => void;
}

function RoletteOptionPage({ options, setOptions, allFilled, setAllFilled, setOpenRoulette }: RoletteOptionPageProps) {
  const [count, setCount] = useState<number>(2);

  const handleInputChange = (id: number, value: string) => {
    const newParticipants = options.map(participant =>
      participant.id === id ? { ...participant, value: value } : participant
    );
    setOptions(newParticipants);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options.length < count) {
      const newParticipants = [
        ...options,
        ...Array(count - options.length).fill(null).map((_, index) => ({
          id: options.length + index + 1,
          value: '',
        })),
      ];
      setOptions(newParticipants);
    }

    if (allFilled) {
      setOpenRoulette(true);
      router.push('/roulette/roulette-page');
    }
  };

  const handleCount = (text: string) => {
    if (text === 'plus') {
      setCount(count + 1);
      setOptions([...options, { id: options.length + 1, value: '' }]);
    } else if (text === 'minus' && count > 2) {
      setCount(count - 1);
      setOptions(options.slice(0, -1));
    }
  };

  const handleDeleteOption = (index: number) => {
    const newParticipants = options.filter((_, i) => i !== index);
    setOptions(newParticipants);
    if (count > 2) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const allInputsFilled = options.slice(0, count).every(participant => participant.value.trim() !== '');
    setAllFilled(allInputsFilled);
  }, [options, count, setAllFilled]);

  return (
    <div className="flex bg-white rounded-3xl h-516 flex-col">
      <div className="flex w-full flex-row-reverse pr-7 pt-10">
        <div className="flex items-center gap-2">
          <button onClick={() => handleCount('minus')} disabled={count <= 2} className="flex p-2 bg-gray rounded-full w-7 h-7 justify-center items-center">
            -
          </button>
          <span>옵션 {count}</span>
          <button onClick={() => handleCount('plus')} className="flex p-2 bg-gray rounded-full w-7 h-7 justify-center items-center">
            +
          </button>
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col">
        <div className="flex flex-col h-370 items-center gap-7.5 my-11 mx-7 overflow-y-scroll">
          {options.slice(0, count).map(participant => (
            <div key={participant.id} className="relative flex w-full items-center">
              <input
                className="flex w-full p-2 rounded-3xl border-solid border text-xs"
                type="text"
                value={participant.value}
                onChange={(e) => handleInputChange(participant.id , e.target.value)}
                placeholder="옵션을 입력해주세요."
              />
              {count > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteOption(participant.id)}
                  className="flex absolute right-2 p-1 bg-gray rounded-full w-5 h-5 justify-center items-center"
                >
                  x
                </button>
              )}
            </div>
          ))}
        </div>
        {allFilled ? (
          <button type="submit" onClick={() => setOpenRoulette(true)} className="flex w-full py-8 bg-blue justify-center text-white absolute bottom-0 left-0">
            확인
          </button>
        ) : (
          <button type="submit" className="flex w-full py-8 bg-gray justify-center text-white absolute bottom-0 left-0">
            옵션을 작성해주세요.
          </button>
        )}
      </form>
    </div>
  );
}

export default RoletteOptionPage;
