import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function AddMembers({ setList }: { setList: (data: string[]) => void }) {
  const [count, setCount] = useState(0);
  const {
    register,
    unregister,
    getValues,
    formState: { isValid },
  } = useForm();

  return (
    <div className="min-h-[60vh] w-full rounded-xl bg-white p-4">
      <div className="mb-5 flex items-center justify-end gap-3">
        <button
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#d9d9d9] text-center text-lg"
          onClick={() => {
            if (count) {
              unregister(`${count - 1}`);
              setCount((prev) => prev - 1);
            }
          }}
        >
          -
        </button>
        <div className="grid min-w-16 grid-cols-2 text-center text-xl font-semibold">
          인원
          <span className="text-end text-[#3160d8]">{count} </span>
        </div>
        <button
          className="flex h-4 w-4 items-center justify-center rounded-full bg-[#d9d9d9] text-center text-lg"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {Array.from({ length: count }).map((_, index) => (
          <input
            className="rounded-full border-[1px] border-solid px-4 py-2"
            placeholder="이름을 입력해주세요"
            key={index}
            type="text"
            {...register(`${index}`, { required: true })}
          />
        ))}
      </div>

      <button
        className="fixed bottom-0 left-[50%] h-20 w-full max-w-md translate-x-[-50%] bg-[#3160D8] text-lg text-white disabled:bg-[#d9d9d9]"
        type="button"
        disabled={!isValid || !count}
        onClick={() => setList(Object.values(getValues()))}
      >
        {isValid ? '확인' : '이름을 작성해주세요.'}
      </button>
    </div>
  );
}
