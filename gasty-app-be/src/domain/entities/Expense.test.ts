import { describe, it, expect } from 'vitest';
import { Expense } from './Expense';

describe('Expense', () => {
  it('should create an expense with valid data', () => {
    const expense = new Expense({
      amount: 100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch',
      bankId: 'bank-123',
    });
    expect(expense).toBeInstanceOf(Expense);
  });

  it('should throw an error if amount is not positive', () => {
    expect(() => new Expense({
      amount: -100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch',
      bankId: 'bank-123',
    })).toThrow('Amount must be positive');
  });

  it('should throw an error if category is empty', () => {
    expect(() => new Expense({
      amount: 100,
      date: new Date(),
      category: '',
      description: 'Lunch',
      bankId: 'bank-123',
    })).toThrow('Category is required');
  });

    it('should throw an error if bankId is empty', () => {
    expect(() => new Expense({
      amount: 100,
      date: new Date(),
      category: 'Food',
      description: 'Lunch',
      bankId: '',
    })).toThrow('Bank ID is required');
  });
});
