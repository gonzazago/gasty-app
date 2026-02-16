import { Router } from 'express';
import { ExpenseController } from '../controllers/ExpenseController';

/**
 * Rutas HTTP para gastos
 */
export function createExpenseRoutes(expenseController: ExpenseController): Router {
  const router = Router();

  router.post('/', (req, res) => expenseController.create(req, res));
  router.get('/', (req, res) => expenseController.getAll(req, res));
  router.get('/:id', (req, res) => expenseController.getById(req, res));
  router.put('/:id', (req, res) => expenseController.update(req, res));
  router.delete('/:id', (req, res) => expenseController.delete(req, res));

  return router;
}

