import { describe, it, expect, vi } from 'vitest';
import { UpdateExpenseUseCase } from './UpdateExpenseUseCase';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';
import { Expense } from '@domain/entities/Expense';

describe('UpdateExpenseUseCase', () => {
  it('should update and save an expense', async () => {
    const expense = new Expense({ id: '1', amount: 100, date: new Date(), category: 'Food', bankId: 'bank-123' });

    const expenseRepository: IExpenseRepository = {
      update: vi.fn().mockImplementation((expense: Expense) => Promise.resolve(expense)),
      findById: vi.fn().mockResolvedValue(expense),
      save: vi.fn(),
      findAll: vi.fn(),
      findByDateRange: vi.fn(),
      delete: vi.fn(),
    };

    const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);

    const updatedData = { amount: 150 };
    const updatedExpense = await updateExpenseUseCase.execute('1', updatedData);

    expect(expenseRepository.findById).toHaveBeenCalledWith('1');
    expect(expenseRepository.update).toHaveBeenCalledOnce();
    expect(updatedExpense.amount).toBe(150);
  });

  it('should throw an error if expense not found', async () => {
    const expenseRepository: IExpenseRepository = {
      findById: vi.fn().mockResolvedValue(null),
      update: vi.fn(),
      save: vi.fn(),
      findAll: vi.fn(),
      findByDateRange: vi.fn(),
      delete: vi.fn(),
    };

    const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
    const updatedData = { amount: 150 };

    await expect(updateExpenseUseCase.execute('1', updatedData)).rejects.toThrow('Expense not found');
  });
});
