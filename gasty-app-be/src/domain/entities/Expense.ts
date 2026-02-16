import { BaseEntity } from './BaseEntity';

interface ExpenseProps {
  id?: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
  bankId?: string;
}

export class Expense extends BaseEntity {
  amount: number;
  date: Date;
  category: string;
  description?: string;
  bankId?: string;

  constructor(props: ExpenseProps) {
    super(props.id || '');
    if (props.amount <= 0) {
      throw new Error('Amount must be positive');
    }
    if (!props.category) {
      throw new Error('Category is required');
    }

    this.amount = props.amount;
    this.date = props.date;
    this.category = props.category;
    this.description = props.description;
    this.bankId = props.bankId;
  }
}
