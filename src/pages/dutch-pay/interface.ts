export interface MemberProps {
  name: string;
  paid: number;
  diff?: number;
}

export interface Member {
  name: string;
  paid: number;
  diff: number;
}

export class MemberClass {
  name: string;

  paid: number;

  diff: number;

  constructor({ name, paid, diff }: MemberProps) {
    this.name = name;
    this.paid = paid;
    this.diff = diff || 0;
  }

  setDiff(diff: number) {
    this.diff = diff;
  }

  calculateDiff(average: number) {
    this.diff = average - this.paid;
    return this;
  }
}

export interface Transfer {
  id: number;
  from: string;
  to: string;
  amount: number;
}

export class TransferClass {
  id: number;

  from: string;

  to: string;

  amount: number;

  constructor({
    id, from, to, amount,
  }: Transfer) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}
