export interface MemberProps {
  id: number;
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
  id: number;

  name: string;

  paid: number;

  diff: number;

  constructor({ id, name, paid, diff }: MemberProps) {
    this.id = id;
    this.name = name;
    this.paid = paid;
    this.diff = diff || 0;
  }

  setDiff(diff: number) {
    this.diff = diff;
  }

  calculateDiff(average: number) {
    this.diff =  this.paid-average ;
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
