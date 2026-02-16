import { Request, Response } from 'express';
import {
  CreateExpenseUseCase,
  DeleteExpenseUseCase,
  GetExpenseByIdUseCase,
  GetExpensesUseCase,
  UpdateExpenseUseCase,
} from '@application/use-cases/expenses';

/**
 * Controlador HTTP para gastos
 * Adaptador primario (Driving Adapter) que convierte peticiones HTTP
 * en llamadas a casos de uso
 */
export class ExpenseController {
  constructor(
    private createExpenseUseCase: CreateExpenseUseCase,
    private getExpensesUseCase: GetExpensesUseCase,
    private getExpenseByIdUseCase: GetExpenseByIdUseCase,
    private updateExpenseUseCase: UpdateExpenseUseCase,
    private deleteExpenseUseCase: DeleteExpenseUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { amount, description, category, date, bankId, cardId } = req.body;

      if (!amount || !description || !category || !date) {
        res.status(400).json({
          error: 'Faltan campos requeridos: amount, description, category, date',
        });
        return;
      }

      const expense = await this.createExpenseUseCase.execute(
        amount,
        description,
        category,
        new Date(date),
        bankId,
        cardId
      );

      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const expenses = await this.getExpensesUseCase.execute();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const expense = await this.getExpenseByIdUseCase.execute(id);

      if (!expense) {
        res.status(404).json({ error: 'Gasto no encontrado' });
        return;
      }

      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const expense = await this.updateExpenseUseCase.execute(id, req.body);
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteExpenseUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}

