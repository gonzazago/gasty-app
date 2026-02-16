import { describe, it, expect, vi } from 'vitest';
import { ExpenseController } from './ExpenseController';
import { CreateExpenseUseCase, GetExpensesUseCase, GetExpenseByIdUseCase, UpdateExpenseUseCase, DeleteExpenseUseCase } from '@application/use-cases/expenses';
import { Request, Response } from 'express';

describe('ExpenseController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  } as unknown as Response;

  const createExpenseUseCase = { execute: vi.fn() } as unknown as CreateExpenseUseCase;
  const getExpensesUseCase = { execute: vi.fn() } as unknown as GetExpensesUseCase;
  const getExpenseByIdUseCase = { execute: vi.fn() } as unknown as GetExpenseByIdUseCase;
  const updateExpenseUseCase = { execute: vi.fn() } as unknown as UpdateExpenseUseCase;
  const deleteExpenseUseCase = { execute: vi.fn() } as unknown as DeleteExpenseUseCase;

  const controller = new ExpenseController(
    createExpenseUseCase,
    getExpensesUseCase,
    getExpenseByIdUseCase,
    updateExpenseUseCase,
    deleteExpenseUseCase
  );

  it('should create an expense', async () => {
    mockRequest.body = { amount: 100, description: 'Lunch', category: 'Food', date: new Date(), bankId: 'bank-123' };

    await controller.create(mockRequest, mockResponse);

    expect(createExpenseUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should get all expenses', async () => {
    await controller.getAll(mockRequest, mockResponse);

    expect(getExpensesUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should get an expense by id', async () => {
    mockRequest.params = { id: '1' };

    await controller.getById(mockRequest, mockResponse);

    expect(getExpenseByIdUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should update an expense', async () => {
    mockRequest.params = { id: '1' };
    mockRequest.body = { amount: 150 };

    await controller.update(mockRequest, mockResponse);

    expect(updateExpenseUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should delete an expense', async () => {
    mockRequest.params = { id: '1' };

    await controller.delete(mockRequest, mockResponse);

    expect(deleteExpenseUseCase.execute).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });
});
