import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import { CardController } from './CardController';
import { CreateCardUseCase } from '@application/use-cases/cards/CreateCardUseCase';

describe('CardController', () => {
  it('should create a card successfully', async () => {
    const mockCreateCardUseCase = {
      execute: vi.fn().mockResolvedValue({ id: '1', name: 'Test Card' }),
    };

    const cardController = new CardController(
      mockCreateCardUseCase as any,
      {} as any,
      {} as any,
      {} as any
    );

    const app = express();
    app.use(express.json());
    app.post('/cards', (req, res) => cardController.create(req, res));

    const cardData = {
      bankId: 'bank-1',
      name: 'Test Card',
      type: 'visa',
      lastFourDigits: '1234',
      color: '#FFFFFF',
      style: 'gold',
    };

    const response = await request(app).post('/cards').send(cardData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Card');
    expect(mockCreateCardUseCase.execute).toHaveBeenCalledWith(
      cardData.bankId,
      cardData.name,
      cardData.type,
      cardData.lastFourDigits,
      cardData.color,
      cardData.style
    );
  });
});
