import { MemberClass, Transfer } from '@/pages/dutch-pay/interface';

export default function PayResult({
  members,
  transfer,
  onClick,
}: {
  members: MemberClass[];
  transfer: Transfer[];
  onClick: () => void;
  }) {
  const type = [...new Set(transfer.map(value => value.from))];
  const list = type.map(t => transfer.filter(trans => trans.from === t));

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4">
        <div className="text-3xl font-semibold">총액</div>
        <div className="flex justify-between text-3xl font-semibold text-[#3160D8]">
          {members.reduce((acc, member) => acc + Number(member.paid), 0).toLocaleString()}
          <span className="text-black">원</span>
        </div>
      </div>

      <div className="w-full rounded-xl bg-white p-4">
        <div className="border-b-[1px] border-solid border-[#e7e7e7] pb-4 text-3xl font-semibold">
          지출 내역
        </div>
        {members.map((member) => (
          <div className="flex justify-between p-4 text-lg" key={member.id}>
            <div>{member.name}</div>
            <div>{Number(member.paid).toLocaleString()} 원</div>
          </div>
        ))}
      </div>

      <div className="w-full rounded-xl bg-white p-4">
        <div className="border-b-[1px] border-solid border-[#e7e7e7] pb-4 text-3xl font-semibold">
          정산 내역
        </div>
        {type.map((member,index) => (
          <div className="flex flex-col p-4 text-lg mb-3" key={member}>
            <div className="text-xl font-semibold">{member}</div>
            {list[index].map(trans =>
              
              <div className="flex items-center justify-between text-[#D83131]" key={trans.id}>
                <div>{`-> ${ trans.to}`}</div>
                <div>{ trans.amount.toLocaleString()}원</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-0 left-[50%] h-20 w-full max-w-md translate-x-[-50%] bg-[#3160D8] text-2xl text-white disabled:bg-[#d9d9d9]"
        type="button"
        onClick={onClick}
      >
        확인
      </button>
    </div>
  );
}
