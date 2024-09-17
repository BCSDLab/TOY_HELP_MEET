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
    <div className="h-[50px] w-full">
      <div className="fixed top-0 flex h-[50px] w-full max-w-md justify-between bg-transparent p-3">
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
