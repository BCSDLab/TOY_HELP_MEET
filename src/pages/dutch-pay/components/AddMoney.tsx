import { useForm } from 'react-hook-form';
import { MemberClass } from '@/pages/dutch-pay/interface';

export default function AddMoney({
  members,
  deleteMember,
  setPaid,
}: {
  members: MemberClass[];
  deleteMember: (idx: number) => void;
  setPaid: (paid: number[]) => void;
}) {
  const {
    register,
    unregister,
    watch,
    getValues,
    formState: { isValid },
  } = useForm({
    defaultValues: Object.fromEntries(members.map((element) => [`${element.id}`, element.paid])),
  });

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4">
        <div className="text-3xl font-semibold">총액</div>
        <div className="flex justify-between text-3xl font-semibold text-[#3160D8]">
          {Object.values(watch())
            .reduce((acc, paid) => acc + Number(paid), 0)
            .toLocaleString()}
          <span className="text-black">원</span>
        </div>
      </div>
      <div className="min-h-[50vh] w-full rounded-xl bg-white p-4">
        <div className="mb-5 flex w-full items-center gap-3">
          <div className="flex w-full flex-col gap-5">
            {members.map((member, index) => (
              <div className="flex items-center justify-between" key={member.id}>
                {member.name}
                <div>
                  <input
                    className="mr-2 border-b-[1px] border-solid py-2 text-end text-lg"
                    placeholder="금액을 입력해주세요"
                    type="number"
                    {...register(`${member.id}`, { required: true })}
                  />
                  원
                  <button
                    className="ml-3 h-5 w-5 rounded-full bg-[#d9d9d9] text-sm text-white"
                    type="button"
                    onClick={() => {
                      deleteMember(index);
                      unregister(`${member.id}`);
                    }}
                    tabIndex={-1}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="fixed bottom-0 left-[50%] h-20 w-full max-w-md translate-x-[-50%] bg-[#3160D8] text-lg text-white disabled:bg-[#d9d9d9]"
          type="button"
          disabled={!isValid}
          onClick={() => setPaid(Object.values(getValues()).map((v) => Number(v)))}
        >
          {isValid ? '정산하기' : '금액을 작성해주세요'}
        </button>
      </div>
    </div>
  );
}
