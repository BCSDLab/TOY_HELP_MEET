import { useRouter } from 'next/router';
import Close from '@/assets/svg/close.svg';
import Left from '@/assets/svg/left.svg';

interface Props {
  path?: string;
  close?: boolean;
}
export default function TopNavigation({ path, close = false }: Props) {
  const router = useRouter();
  return (
    <div className="w-full h-[50px]"> 
      <div className="fixed top-0 flex w-full max-w-md h-[50px] justify-between p-3 bg-[#f7f7f7]">
        <button onClick={() => (path ? router.push(path) : router.back())}>
          <Left />
        </button>
        {close && (
        <button onClick={() => router.push('/')}>
          <Close />
        </button>
        )}
      </div>
    </div>
  );
}
