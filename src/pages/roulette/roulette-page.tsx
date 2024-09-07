import React, { useEffect, useRef, useState } from 'react';
import InvertedTriangleIcon from '@/assets/svg/inverted-triangle.svg';
import { useRoulette } from '@/Context/RouletteContext';
import WinnerImage from '@/assets/images/winnerImage.png';
import Image from 'next/image';

interface RoulettePageProps {
  onGoBack: () => void;
}

const defaultOptions = [
  { id: 1, value: '' },
  { id: 2, value: '' },
];

const RoulettePage: React.FC<RoulettePageProps> = ({ onGoBack }) => {
  const { options, setOptions } = useRoulette();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawRoulette();
    }
  }, [rotation, options]);

const getColor = (() => {
  const colors = [
    "#CADFFF",
    "#EBEBEB",
    "#FFFFFF",
  ];

  const state = {
    prevIndex: -1,
    firstIndex: -1,
    count: 0,
  };

  return () => {
    const selectColor = (prevIndex: number, firstIndex: number, count: number) => {
      const index = (prevIndex + 1) % colors.length;

      if (count === 0) {
        state.firstIndex = index;
        state.prevIndex = index;
        state.count += 1;
        return colors[index];
      }

      if (count === colors.length - 1 && index === firstIndex) {
        state.prevIndex = (index + 1) % colors.length;
        state.count += 1;
        return colors[(index + 1) % colors.length];
      }

      state.prevIndex = index;
      state.count += 1;
      return colors[index];
    };

    return selectColor(state.prevIndex, state.firstIndex, state.count);
  };
})();

  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (canvas && options.length > 0) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const [cw, ch] = [canvas.width / 2, canvas.height / 2];
        const arc = Math.PI / (options.length / 2);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < options.length; i++) {
          ctx.beginPath();
          ctx.fillStyle = getColor();
          ctx.moveTo(cw, ch);
          ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
          ctx.fill();
          ctx.closePath();
        }

        // 중앙 동그라미 그리기
        ctx.beginPath();
        ctx.arc(cw, ch, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#3160D8';
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'rgba(49, 96, 216, 0.47)';
        ctx.stroke();
        ctx.closePath();


        const maxTextWidth = cw - 60;

        for (let i = 0; i < options.length; i++) {
          const angle = arc * i + arc / 2;

          ctx.save();

          ctx.translate(cw + Math.cos(angle) * (cw - 50), ch + Math.sin(angle) * (ch - 50));
          ctx.rotate(angle + Math.PI / 2);

          const text = options[i].value;
          let truncatedText = text;

          if (ctx.measureText(text).width > maxTextWidth) {
            while (
              ctx.measureText(truncatedText + '...').width > maxTextWidth &&
              truncatedText.length > 0
            ) {
              truncatedText = truncatedText.slice(0, -1);
            }
            truncatedText += '...';
          }

          ctx.fillText(truncatedText, 0, 0);

          ctx.restore();
        }
      }
    }
  };

  const rotateRoulette = () => {
    if (spinning) return;

    setSpinning(true);
    const canvas = canvasRef.current;
    if (canvas && options.length > 0) {
      canvas.style.transform = `initial`;
      canvas.style.transition = `initial`;

      setTimeout(() => {
        const ran = Math.floor(Math.random() * options.length);
        const arc = 360 / options.length;
        const rotate = ran * arc + 3600 + arc * 3 - arc / 4;

        canvas.style.transform = `rotate(-${rotate}deg)`;
        canvas.style.transition = `2s`;

        setTimeout(() => {
          setWinner(options[ran].value);
          setSpinning(false);
        }, 2000);
      }, 1);
    }
  };

  
  const resetOptions = () => {
    onGoBack();
  };

  const newRoulette = () => {
    setOptions(defaultOptions);
    onGoBack();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between pb-24">
      <div className="flex flex-col items-center">
        <div className="flex relative h-96 items-center justify-center">
          <canvas
            ref={canvasRef}
            width={353}
            height={353}
            className="z-10 cursor-pointer rounded-full"
            onClick={rotateRoulette}
          />
          <div className="absolute text-white z-10">GO</div>
          <InvertedTriangleIcon className="absolute z-20 top-3 text-white" />
          <div className="absolute w-[369px] h-[369px] bg-blue rounded-full"></div>
        </div>
      </div>
      <div className="flex w-full justify-between px-4 py-3">
        <button
          onClick={resetOptions}
          className="text-black text-m mt-4 rounded-lg bg-rouletteBlue px-3 py-2 font-normal transition z-30"
        >
          재설정하기
        </button>

        <button
          onClick={newRoulette}
          className="text-m text-black mt-4 rounded-lg bg-rouletteBlue px-3 py-2 font-normal transition z-30"
        >
          새로운 룰렛
        </button>
      </div>

      <button
        onClick={rotateRoulette}
        className="absolute bottom-0 left-0 flex w-full justify-center bg-blue py-8 text-white"
        disabled={spinning}
      >
        {spinning ? '돌리는 중...' : winner ? '다시 돌리기' : '룰렛 돌리기'}
      </button>
      {
        (!spinning && winner ) && (
          <div className='flex bg-white/95 w-[90%] h-[655px] absolute z-20 top-0 rounded-xl flex-col items-center p-5'>
            <div className="flex text-3xl font-semibold mb-20">
              결과 보기
            </div>
            <Image src={WinnerImage} alt="축하" className='flex w-[150px] h-[150px]'/>
            <div className="flex text-5xl font-normal">
              {winner}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default RoulettePage;
