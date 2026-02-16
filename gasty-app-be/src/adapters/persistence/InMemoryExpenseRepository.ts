import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

/**
 * Adaptador de persistencia: Repositorio en memoria para gastos
 * Esta es una implementación temporal. En producción se reemplazaría
 * por un adaptador que use una base de datos real (PostgreSQL, MongoDB, etc.)
 */
export class InMemoryExpenseRepository implements IExpenseRepository {
  private expenses: Map<string, Expense> = new Map();

  async findById(id: string): Promise<Expense | null> {
    return this.expenses.get(id) || null;
  }

  async findAll(): Promise<Expense[]> {
    return Array.from(this.expenses.values());
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    return Array.from(this.expenses.values()).filter(
      (expense) => expense.date >= startDate && expense.date <= endDate
    );
  }

  async save(expense: Expense): Promise<Expense> {
    this.expenses.set(expense.id, expense);
    return expense;
  }

  async update(expense: Expense): Promise<Expense> {
    if (!this.expenses.has(expense.id)) {
      throw new Error('Gasto no encontrado');
    }
    expense.updateTimestamp();
    this.expenses.set(expense.id, expense);
    return expense;
  }

  async delete(id: string): Promise<void> {
    if (!this.expenses.has(id)) {
      throw new Error('Gasto no encontrado');
    }
    this.expenses.delete(id);
  }
}

