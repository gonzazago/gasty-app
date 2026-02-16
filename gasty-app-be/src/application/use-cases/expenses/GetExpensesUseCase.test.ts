import { describe, it, expect, vi } from 'vitest';
import { GetExpensesUseCase } from './GetExpensesUseCase';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';
import { Expense } from '@domain/entities/Expense';

describe('GetExpensesUseCase', () => {
  it('should return all expenses', async () => {
    const expenses = [
      new Expense({ id: '1', amount: 100, date: new Date(), category: 'Food', bankId: 'bank-123' }),
      new Expense({ id: '2', amount: 200, date: new Date(), category: 'Transport', bankId: 'bank-456' }),
    ];

    const expenseRepository: IExpenseRepository = {
      findAll: vi.fn().mockResolvedValue(expenses),
      findById: vi.fn(),
      save: vi.fn(),
      findByDateRange: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
    const result = await getExpensesUseCase.execute();

    expect(expenseRepository.findAll).toHaveBeenCalledOnce();
    expect(result).toEqual(expenses);
  });
});
