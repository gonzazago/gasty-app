import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryExpenseRepository } from './InMemoryExpenseRepository';
import { Expense } from '../../domain/entities/Expense';

describe('InMemoryExpenseRepository', () => {
  let repository: InMemoryExpenseRepository;

  beforeEach(() => {
    repository = new InMemoryExpenseRepository();
  });

  it('should save an expense', async () => {
    const expense = new Expense({
      amount: 100,
      date: new Date(),
      category: 'Food',
      bankId: 'bank-123',
    });
    const savedExpense = await repository.save(expense);
    expect(savedExpense).toEqual(expense);
  });

  it('should find an expense by id', async () => {
    const expense = new Expense({
      id: '1',
      amount: 100,
      date: new Date(),
      category: 'Food',
      bankId: 'bank-123',
    });
    await repository.save(expense);
    const foundExpense = await repository.findById('1');
    expect(foundExpense).toEqual(expense);
  });

    it('should return null if expense not found', async () => {
    const foundExpense = await repository.findById('non-existent-id');
    expect(foundExpense).toBeNull();
  });

  it('should find all expenses', async () => {
    const expense1 = new Expense({
      id: '1',
      amount: 100,
      date: new Date(),
      category: 'Food',
      bankId: 'bank-123',
    });
    const expense2 = new Expense({
      id: '2',
      amount: 200,
      date: new Date(),
      category: 'Transport',
      bankId: 'bank-456',
    });
    await repository.save(expense1);
    await repository.save(expense2);

    const expenses = await repository.findAll();
    expect(expenses).toHaveLength(2);
    expect(expenses).toContainEqual(expense1);
    expect(expenses).toContainEqual(expense2);
  });

  it('should update an expense', async () => {
    const expense = new Expense({
      id: '1',
      amount: 100,
      date: new Date(),
      category: 'Food',
      bankId: 'bank-123',
    });
    await repository.save(expense);

    expense.amount = 150;
    const updatedExpense = await repository.update(expense);

    expect(updatedExpense.amount).toBe(150);
  });

  it('should delete an expense', async () => {
    const expense = new Expense({
      id: '1',
      amount: 100,
      date: new Date(),
      category: 'Food',
      bankId: 'bank-123',
    });
    await repository.save(expense);

    await repository.delete('1');
    const foundExpense = await repository.findById('1');
    expect(foundExpense).toBeNull();
  });
});
