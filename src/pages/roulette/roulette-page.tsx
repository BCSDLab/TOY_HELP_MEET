import React, { useEffect, useRef, useState } from 'react';
import { useRoulette } from '../../context/RouletteContext';

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
          ctx.fillStyle = getRandomColor();
          ctx.moveTo(cw, ch);
          ctx.arc(cw, ch, cw, arc * (i - 1), arc * i);
          ctx.fill();
          ctx.closePath();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '18px Pretendard';
        ctx.textAlign = 'center';

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

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="flex h-screen flex-col items-center justify-between pb-24">
      <div className="flex flex-col items-center">
        {!spinning && winner ? (
          <div className="flex w-80 items-center justify-center truncate text-center text-3xl font-normal">
            {winner}
          </div>
        ) : (
          <div className="flex h-9"></div>
        )}
        <div className="flex h-96 items-center justify-center">
          <canvas
            ref={canvasRef}
            width={353}
            height={353}
            className="cursor-pointer rounded-full"
            onClick={rotateRoulette}
          />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <button
          onClick={resetOptions}
          className="text-black text-m mt-4 rounded-lg bg-white px-3 py-2 font-normal transition"
        >
          재설정하기
        </button>

        <button
          onClick={newRoulette}
          className="text-m text-black mt-4 rounded-lg bg-white px-3 py-2 font-normal transition"
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
    </div>
  );
};

export default RoulettePage;
