import React, { useEffect, useRef, useState } from 'react';
import InvertedTriangleIcon from '@/assets/svg/inverted-triangle.svg';
import { useRoulette } from '@/Context/RouletteContext';
import WinnerModal from '@/pages/roulette/WinnerModal';

interface RoulettePageProps {
  onGoBack: () => void;
}

const defaultOptions = [
  { id: 1, value: '' },
  { id: 2, value: '' },
];

function RoulettePage ({ onGoBack } : RoulettePageProps) {
  const { options, setOptions } = useRoulette();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawRoulette();
    }
  }, [options]);

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

    const selectColor = (prevIndex: number, firstIndex: number, count: number) => {
      const index = Math.floor(Math.random() * colors.length);

      if (count === 0) {
        state.firstIndex = index;
        state.prevIndex = index;
        state.count += 1;
        return colors[index];
      }

      if (index === prevIndex) {
        return selectColor(prevIndex, firstIndex, count);
      }

      if (count === colors.length - 1 && index === firstIndex) {
        return selectColor(prevIndex, firstIndex, count);
      }

      state.prevIndex = index;
      state.count += 1;
      return colors[index];
    };

    return () => selectColor(state.prevIndex, state.firstIndex, state.count);
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
        ctx.arc(cw, ch, cw, arc * i - Math.PI / 2, arc * (i + 1) - Math.PI / 2);
        ctx.fill();
        ctx.closePath();
      }

      ctx.beginPath();
      ctx.arc(cw, ch, 25, 0, Math.PI * 2);
      ctx.fillStyle = '#3160D8';
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(49, 96, 216, 0.47)';
      ctx.stroke();
      ctx.closePath();

      ctx.font = '16px Arial';
      ctx.fillStyle = '#000';

      for (let i = 0; i < options.length; i++) {
        const angle = arc * i + arc / 2 - Math.PI / 2;
        const radius = cw - 50;

        const arcLength = radius * arc;

        ctx.save();

        ctx.translate(cw + Math.cos(angle) * radius, ch + Math.sin(angle) * radius);
        ctx.rotate(angle + Math.PI / 2);

        let text = options[i].value;
        let truncatedText = text;

        if (ctx.measureText(text).width > arcLength) {
          while (ctx.measureText(truncatedText + '...').width > arcLength && truncatedText.length > 0) {
            truncatedText = truncatedText.slice(0, -1);
          }
          truncatedText += '...';
        }

        const textWidth = ctx.measureText(truncatedText).width;
        ctx.fillText(truncatedText, -textWidth / 2, 0);

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
        const correctionAngle = -50;
        const rotate = (ran * arc) + 5400 - (arc / 2) - correctionAngle;

        canvas.style.transform = `rotate(-${rotate}deg)`;
        canvas.style.transition = `transform 4s cubic-bezier(0.25, 1, 0.5, 1)`;

        setTimeout(() => {
          setWinner(options[ran].value);
          setSpinning(false);
        }, 4000);
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
      {
        (!spinning && winner)
          ? <div className="mb-16 flex justify-center text-4xl font-semibold"></div>
          : <div className="mb-16 flex justify-center text-4xl font-semibold">룰렛 돌리기</div>
      }
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

      {(!spinning && winner ) && <WinnerModal winner={winner} />}
    </div>
  );
};

export default RoulettePage;
