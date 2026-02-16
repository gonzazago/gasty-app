import { Request, Response } from 'express';
import { CreateBankUseCase } from '@application/use-cases/CreateBankUseCase';
import { GetBanksUseCase } from '@application/use-cases/GetBanksUseCase';

/**
 * Controlador HTTP para bancos
 * Adaptador primario (Driving Adapter) que convierte peticiones HTTP
 * en llamadas a casos de uso
 */
export class BankController {
  constructor(
    private createBankUseCase: CreateBankUseCase,
    private getBanksUseCase: GetBanksUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, balance } = req.body;

      if (!name) {
        res.status(400).json({ error: 'El campo name es requerido' });
        return;
      }

      const bank = await this.createBankUseCase.execute(name, balance || 0);
      res.status(201).json(bank);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const banks = await this.getBanksUseCase.execute();
      res.status(200).json(banks);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}

