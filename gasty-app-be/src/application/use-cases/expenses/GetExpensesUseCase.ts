import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

/**
 * Caso de uso: Obtener todos los gastos
 */
export class GetExpensesUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(): Promise<Expense[]> {
    return await this.expenseRepository.findAll();
  }
}

