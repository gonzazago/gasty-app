import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

/**
 * Caso de uso: Crear un nuevo gasto
 * Contiene la lógica de aplicación para crear un gasto
 */
export class CreateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute(
    amount: number,
    description: string,
    category: string,
    date: Date,
    bankId?: string,
    cardId?: string
  ): Promise<Expense> {
    // Generar ID (en producción, usar un generador de IDs)
    const id = `expense-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Crear la entidad de dominio
    const expense = new Expense({
      id,
      amount,
      description,
      category,
      date,
      bankId: bankId || '',
      cardId,
    });

    // Persistir usando el repositorio
    return await this.expenseRepository.save(expense);
  }
}

