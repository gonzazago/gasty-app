import { Request, Response } from 'express';
import { CreateCardUseCase } from '@application/use-cases/cards/CreateCardUseCase';
import { GetCardsUseCase } from '@application/use-cases/cards/GetCardsUseCase';
import { GetCardByIdUseCase } from '@application/use-cases/cards/GetCardByIdUseCase';
import { GetCardsByBankIdUseCase } from '@application/use-cases/cards/GetCardsByBankIdUseCase';

/**
 * Controlador HTTP para tarjetas
 * Adaptador primario (Driving Adapter) que convierte peticiones HTTP
 * en llamadas a casos de uso
 */
export class CardController {
  constructor(
    private createCardUseCase: CreateCardUseCase,
    private getCardsUseCase: GetCardsUseCase,
    private getCardByIdUseCase: GetCardByIdUseCase,
    private getCardsByBankIdUseCase: GetCardsByBankIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { bankId, name, type, lastFourDigits, color, style } = req.body;

      if (!bankId || !name || !type || !color || !style) {
        res.status(400).json({
          error: 'Faltan campos requeridos: bankId, name, type, color, style',
        });
        return;
      }

      if (!['visa', 'mastercard', 'amex', 'other'].includes(type)) {
        res.status(400).json({
          error: 'El tipo de tarjeta debe ser: visa, mastercard, amex u other',
        });
        return;
      }

      const card = await this.createCardUseCase.execute(
        bankId,
        name,
        type,
        lastFourDigits || '',
        color,
        style
      );

      res.status(201).json(card);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const cards = await this.getCardsUseCase.execute();
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const card = await this.getCardByIdUseCase.execute(id);

      if (!card) {
        res.status(404).json({ error: 'Tarjeta no encontrada' });
        return;
      }

      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }

  async getByBankId(req: Request, res: Response): Promise<void> {
    try {
      const { bankId } = req.params;
      const cards = await this.getCardsByBankIdUseCase.execute(bankId);
      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
}

