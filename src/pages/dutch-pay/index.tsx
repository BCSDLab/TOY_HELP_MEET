import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { calculate } from '@/pages/dutch-pay/calculate';
import { Member, Transfer } from './interface';

interface FormType {
  name: string;
  paid: number;
}

export default function DutchPay() {
  const {
    register,
    reset,
    setFocus,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormType>();
  const [rawMembers, setRawmembers] = useState<Member[]>([]);
  const [result, setResult] = useState<{
    members: Member[];
    transfers: Transfer[];
  }|null>();

  const handleAdd = (data: FormType) => {
    setResult(null);
    setRawmembers((prev) => [...prev, new Member({ name: data.name, paid: Number(data.paid) })]);
    setFocus('name');
    reset();
  };

  const handleDelete = (idx: number) => {
    const members = rawMembers.filter((_, index) => index !== idx);
    setRawmembers(members);
    setResult(null);
  };

  return (
    <div className="flex min-h-max w-full flex-col items-center justify-between px-3 py-5">
      <form className="flex w-full gap-1" onSubmit={handleSubmit(handleAdd)}>
        <div className="flex grow flex-col gap-1 border border-black">
          <label className="flex items-center text-lg" htmlFor="name">
            이름
            <input
              type="text"
              id="name"
              className="ml-1 grow border border-black px-2 py-1"
              {...register('name', { required: '이름을 입력해주세요.' })}
            />
          </label>
          <label className="flex items-center text-lg" htmlFor="paid">
            금액
            <input
              id="paid"
              type="text"
              className="ml-1 grow border border-black px-2 py-1"
              {...register('paid', { required: '금액을 입력해주세요.', pattern: /^[0-9]*$/ })}
            />
          </label>
        </div>
        <button
          className="min-w-16 shrink-0 rounded bg-neutral-600 px-2 py-1 text-white disabled:bg-neutral-300"
          type="submit"
          disabled={!isValid}
        >
          추가
        </button>
      </form>
      {!!rawMembers.length && (
        <div className="mt-5 w-full rounded bg-white p-2">
          <div className="mb-3 text-xl font-semibold">돈 낼 사람 목록</div>
          {rawMembers.map((value, index) => (
            <div
              className="flex justify-between py-1 text-lg"
              key={`${value.name} ${value.paid} ${index}`}
            >
              <span className="w-1/2 text-center">{value.name}</span>
              <span className="w-1/2 text-center">{value.paid.toLocaleString()}원</span>
              <button type="button" onClick={() => handleDelete(index)}>
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {result && (
        <div className="mt-5 w-full rounded bg-white p-2">
          <div className="mb-3 text-xl font-semibold">돈 보내기</div>
          {result.transfers.filter(value=>value.amount!==0).map((transfer) => (
            <div
              className="grid grid-cols-2 text-center text-lg"
              key={`${transfer.from} ${transfer.to} ${transfer.amount}`}
            >
              <div>
                {transfer.from} {'->'} {transfer.to}
              </div>
              {transfer.amount.toLocaleString()}원
            </div>
          ))}
        </div>
      )}

      <button
        className="fixed bottom-16 w-full max-w-sm rounded bg-blue-400 py-3 text-center text-lg font-semibold text-white active:bg-blue-500 disabled:bg-neutral-300"
        type="button"
        disabled={!rawMembers.length}
        onClick={() => setResult(calculate(rawMembers))}
      >
        계산하기!
      </button>
    </div>
  );
}
