import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

/**
 * Caso de uso: Obtener un gasto por ID
 */
export class GetExpenseByIdUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(id: string): Promise<Expense | null> {
    return await this.expenseRepository.findById(id);
  }
}

