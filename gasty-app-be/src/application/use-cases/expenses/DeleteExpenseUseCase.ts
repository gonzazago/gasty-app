import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: string): Promise<void> {
    return await this.expenseRepository.delete(id);
  }
}
