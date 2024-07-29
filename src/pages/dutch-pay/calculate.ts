import { Member, Transfer } from './interface';

interface RoundProps {
  members: Member[];
  transfers: Transfer[];
}

function round({ members, transfers }: RoundProps): [Member[], Transfer[]] {
  const newMembers = members.map((member) => new Member(member));
  newMembers.sort((a, b) => b.diff - a.diff);

  const sender = newMembers[0];
  const recipient = newMembers.find((member) => member.diff < 0);
  if (!recipient) { return [newMembers, transfers]; }

  const newTransfers = [...transfers, new Transfer({
    id: transfers.length + 1,
    from: sender.name,
    to: recipient.name,
    amount: sender.diff,
  })];

  recipient.setDiff(recipient.diff + sender.diff);
  sender.setDiff(0);
  return [newMembers, newTransfers];
}

export function calculate(inputMembers: Member[]) {
  let transfers: Transfer[] = [];
  const totalPaid = inputMembers.reduce((acc, member) => acc + member.paid, 0);
  const average = Math.floor(totalPaid / inputMembers.length);
  let members = inputMembers
    .map((member) => new Member(member))
    .map((member) => member.calculateDiff(average));

  for (let i = 0; i < members.length; i += 1) {
    [members, transfers] = round({ members, transfers });
  }

  return { members, transfers };
}