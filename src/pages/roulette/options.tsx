import React, { useEffect, useState } from 'react';

import CloseIcon from '@/assets/svg/small-close.svg';
import { useRoulette } from '@/Context/RouletteContext';

interface RouletteOptionPageProps {
  onProceed: () => void;
}

function RouletteOptionPage({ onProceed }: RouletteOptionPageProps) {
  const { options, setOptions } = useRoulette();
  const [count, setCount] = useState<number>(options.length > 2 ? options.length : 2);
  const [isAllFilled, setIsAllFilled] = useState<boolean>(false);

  useEffect(() => {
    const allInputsFilled = options.slice(0, count).every((option) => option.value.trim() !== '');
    setIsAllFilled(allInputsFilled);
  }, [options, count]);

  const handleInputChange = (id: number, value: string) => {
    setOptions(options.map((option) => (option.id === id ? { ...option, value } : option)));
  };

  const handleCountChange = (action: 'plus' | 'minus') => {
    if (action === 'plus') {
      setCount((prevCount) => prevCount + 1);
      setOptions([...options, { id: options.length + 1, value: '' }]);
    } else if (action === 'minus' && count > 2) {
      setCount((prevCount) => prevCount - 1);
      setOptions(options.slice(0, count - 1));
    }
  };

  const handleDeleteOption = (id: number) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
    setCount(updatedOptions.length);
  };

  const handleSubmit = () => {
    if (isAllFilled) {
      onProceed();
    }
  };

  return (
    <div>
      <div className="mb-16 flex justify-center text-4xl font-semibold">룰렛 돌리기</div>
      <div className="flex h-[516px] flex-col rounded-3xl bg-white">
        <div className="flex w-full flex-row-reverse pr-7 pt-10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCountChange('minus')}
              disabled={count <= 2}
              className="disabled:bg-gray-300 flex h-8 w-8 items-center justify-center rounded-full bg-gray text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              -
            </button>
            <span>옵션 {count}</span>
            <button
              onClick={() => handleCountChange('plus')}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray p-2 text-white"
            >
              +
            </button>
          </div>
        </div>

        <div className="mx-7 my-11 flex flex-grow flex-col items-center gap-7.5 overflow-y-scroll">
          {options.slice(0, count).map((option) => (
            <div key={option.id} className="relative flex w-full items-center">
              <input
                className="border-gray-500 w-full rounded-full border border-solid px-4 py-2 text-sm"
                type="text"
                value={option.value}
                onChange={(e) => handleInputChange(option.id, e.target.value)}
                placeholder="옵션을 입력해주세요."
              />
              {count > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteOption(option.id)}
                  className="absolute right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray"
                >
                  <CloseIcon/>
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`absolute bottom-0 left-0 flex w-full justify-center py-8 text-white ${
            isAllFilled ? 'hover:bg-blue-700 bg-blue' : 'cursor-not-allowed bg-gray'
          } transition`}
          disabled={!isAllFilled}
        >
          {isAllFilled ? '확인' : '옵션을 작성해주세요.'}
        </button>
      </div>
    </div>
  );
};

export default RouletteOptionPage;
