import { Router } from 'express';
import { BankController } from '../controllers/BankController';

/**
 * Rutas HTTP para bancos
 */
export function createBankRoutes(bankController: BankController): Router {
  const router = Router();

  router.post('/', (req, res) => bankController.create(req, res));
  router.get('/', (req, res) => bankController.getAll(req, res));

  return router;
}

