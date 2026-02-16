import { describe, it, expect, vi } from 'vitest';
import { DeleteExpenseUseCase } from './DeleteExpenseUseCase';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';

describe('DeleteExpenseUseCase', () => {
  it('should delete an expense', async () => {
    const expenseRepository: IExpenseRepository = {
      delete: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
      save: vi.fn(),
      findAll: vi.fn(),
      findByDateRange: vi.fn(),
      update: vi.fn(),
    };

    const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
    await deleteExpenseUseCase.execute('1');

    expect(expenseRepository.delete).toHaveBeenCalledWith('1');
  });
});
