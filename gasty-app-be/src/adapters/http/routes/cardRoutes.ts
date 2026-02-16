import { Router } from 'express';
import { CardController } from '../controllers/CardController';

/**
 * Rutas HTTP para tarjetas
 */
export function createCardRoutes(cardController: CardController): Router {
  const router = Router();

  router.post('/', (req, res) => cardController.create(req, res));
  router.get('/', (req, res) => cardController.getAll(req, res));
  router.get('/:id', (req, res) => cardController.getById(req, res));
  router.get('/bank/:bankId', (req, res) => cardController.getByBankId(req, res));

  return router;
}

