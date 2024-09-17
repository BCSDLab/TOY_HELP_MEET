import Image from 'next/image';
import WinnerImage from '@/assets/images/winnerImage.png';

function WinnerModal({winner}: {winner: string}) {
  return (
    <div className='flex bg-white/95 w-[90%] h-[655px] absolute z-20 top-0 rounded-xl flex-col items-center p-5'>
      <div className="flex text-3xl font-semibold mb-20">
        결과 보기
      </div>
      <Image src={WinnerImage} alt="축하" className='flex w-[150px] h-[150px]'/>
      <div className="block text-5xl font-normal w-[220px] max-w-[220px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
        {winner}
      </div>
    </div>
  );
}

export default WinnerModal;

