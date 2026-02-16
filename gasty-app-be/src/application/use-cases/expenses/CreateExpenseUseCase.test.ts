import { describe, it, expect, vi } from 'vitest';
import { CreateExpenseUseCase } from './CreateExpenseUseCase';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';
import { Expense } from '@domain/entities/Expense';

describe('CreateExpenseUseCase', () => {
  it('should create and save an expense', async () => {
    const expenseRepository: IExpenseRepository = {
      save: vi.fn().mockImplementation((expense: Expense) => Promise.resolve(expense)),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByDateRange: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);

    const amount = 100;
    const date = new Date();
    const category = 'Food';
    const description = 'Lunch';
    const bankId = 'bank-123';

    const expense = await createExpenseUseCase.execute(amount, description, category, date, bankId);

    expect(expenseRepository.save).toHaveBeenCalledOnce();
    expect(expense.amount).toBe(amount);
    expect(expense.date).toBe(date);
    expect(expense.category).toBe(category);
    expect(expense.description).toBe(description);
    expect(expense.bankId).toBe(bankId);
  });
});
