import { MemberClass, Transfer } from './interface';

export function calculate(inputMembers: MemberClass[]) {
  const totalPaid = inputMembers.reduce((acc, member) => acc + member.paid, 0);
  const average = Math.floor(totalPaid / inputMembers.length);
  const members = inputMembers
    .map((member) => new MemberClass(member))
    .map((member) => member.calculateDiff(average));

  const minus = members.filter((v) => v.diff < 0);
  const plus = members.filter((v) => v.diff > 0);
  const resultList: Transfer[] = [];

  while (minus.length && plus.length) {
    resultList.push({
      id: resultList.length,
      from: minus[0].name,
      to: plus[0].name,
      amount: minus[0].diff + plus[0].diff > 0 ? Math.abs(minus[0].diff) : Math.abs(plus[0].diff),
    });
    minus[0].diff += plus[0].diff;
    plus[0].diff += minus[0].diff;

    if (minus[0].diff >= 0) {
      minus.shift();
    }

    if (plus[0].diff <= 0) {
      plus.shift();
    }
  }

  return resultList;
}
