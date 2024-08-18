import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Roulette from "../Rolette3D";

interface OptionProps {
  id: number;
  value: string;
}

interface RoulettePageProps { 
  options: OptionProps[];
}

function RoulettePage({ options }: RoulettePageProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [winner, setWinner] = useState<OptionProps | null>(null);
  const router = useRouter();

  const handleReset = () => {
    router.back();
  };

  const startRoulette = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleStop = (winner: OptionProps) => {
    setWinner(winner);
    alert(`Winner is: ${winner.value}`);
  };

  return (
    <div className={'flex flex-col items-center w-96 h-96'}>
      {winner ?  <div className="mt-4 text-lg">{winner.value}</div> : <div className="mt-7"/>}
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Roulette participants={options} isPlaying={isPlaying} onStop={handleStop} />
        <OrbitControls />
      </Canvas>
      <Link href="/roulette" passHref>
        <button onClick={handleReset}>재설정하기</button>
      </Link>
      <Link href="/roulette" passHref>
        <button type="button">새로운 룰렛</button>
      </Link>
      <button onClick={startRoulette}  className="flex w-full py-8 bg-blue justify-center text-white absolute bottom-0 left-0">
        돌리기
      </button>
    </div>
  );
}

export default RoulettePage;
