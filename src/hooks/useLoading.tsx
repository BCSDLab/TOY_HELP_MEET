import { useState, useEffect } from 'react';

export function LoadingDots() {
  const dot = '.';
  const [dots, setDots] = useState(dot);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) return dot;
        else return prevDots + dot;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-24 text-left">
        <h2 className="text-2xl text-blue-500">로딩중{dots}</h2>
      </div>
    </div>
  );
}

export function useLoadingComponent(state: boolean, LoadingComponent = LoadingDots) {
  return state ? <LoadingComponent /> : null;
}
