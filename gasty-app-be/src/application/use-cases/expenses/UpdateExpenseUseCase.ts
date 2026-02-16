import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

export class UpdateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: string, data: Partial<Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Expense> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    Object.assign(expense, data);
    expense.updateTimestamp();

    return await this.expenseRepository.update(expense);
  }
}
