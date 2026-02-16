import { Expense } from '../entities/Expense';

/**
 * Puerto (Port) - Interfaz para el repositorio de gastos
 * Define el contrato que deben cumplir los adaptadores de persistencia
 */
export interface IExpenseRepository {
  findById(id: string): Promise<Expense | null>;
  findAll(): Promise<Expense[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]>;
  save(expense: Expense): Promise<Expense>;
  update(expense: Expense): Promise<Expense>;
  delete(id: string): Promise<void>;
}

