import { useState } from 'react';
import { calculate } from '@/pages/dutch-pay/calculate';
import AddMembers from '@/pages/dutch-pay/components/AddMembers';
import AddMoney from '@/pages/dutch-pay/components/AddMoney';
import PayResult from '@/pages/dutch-pay/components/PayResult';
import { MemberClass, Transfer } from './interface';

export default function DutchPay() {
  const [step, setStep] = useState(0);
  const [members, setMembers] = useState<MemberClass[]>([]);
  const [result, setResult] = useState<Transfer[]>([]);

  const handleDelete = (idx: number) => {
    const filteredList = members.filter((_, index) => index !== idx);
    setMembers(filteredList);
  };

  const handlePaid = (paids: number[]) => {
    const average = Math.floor(paids.reduce((acc, pay) => acc + pay, 0) / paids.length);
    const paidMembers = members.map(
      (value, index) =>
        new MemberClass({ ...value, paid: paids[index], diff: Number(paids[index]) - average })
    );
    setMembers(paidMembers);
    setResult(calculate(paidMembers));
    setStep(2);
  };

  return (
    <div className="flex min-h-max w-full flex-col items-center justify-between px-3 py-5">
      <div className="my-10 text-4xl font-bold">정산하기</div>
      {step === 0 && (
        <AddMembers
          setList={(data) => {
            setMembers(
              data.map((member, index) => new MemberClass({ id: index, name: member, paid: 0 }))
            );
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <AddMoney members={members} deleteMember={handleDelete} setPaid={handlePaid} />
      )}

      {step === 2 && <PayResult members={members} transfer={result} onClick={() => setStep(0)} />}
    </div>
  );
}
