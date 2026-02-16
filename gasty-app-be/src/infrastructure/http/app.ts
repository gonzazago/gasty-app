import express, { Express } from 'express';
import cors from 'cors';
import { Container } from '../di/container';
import { createExpenseRoutes } from '@adapters/http/routes/expenseRoutes';
import { createBankRoutes } from '@adapters/http/routes/bankRoutes';
import { createCardRoutes } from '@adapters/http/routes/cardRoutes';

/**
 * Configuración de la aplicación Express
 */
export function createApp(container: Container): Express {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Rutas
  app.use('/api/expenses', createExpenseRoutes(container.expenseController));
  app.use('/api/banks', createBankRoutes(container.bankController));
  app.use('/api/cards', createCardRoutes(container.cardController));

  // Manejo de errores 404
  app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  return app;
}

