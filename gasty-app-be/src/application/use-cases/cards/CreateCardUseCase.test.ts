import { describe, it, expect, vi } from 'vitest';
import { CreateCardUseCase } from './CreateCardUseCase';
import { ICardRepository } from '@domain/repositories/ICardRepository';
import { Card } from '@domain/entities/Card';

describe('CreateCardUseCase', () => {
  it('should create a card successfully', async () => {
    const cardRepository: ICardRepository = {
      save: vi.fn().mockImplementation((card: Card) => Promise.resolve(card)),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByBankId: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const createCardUseCase = new CreateCardUseCase(cardRepository);

    const cardData = {
      bankId: 'bank-1',
      name: 'Test Card',
      type: 'visa' as 'visa' | 'mastercard' | 'amex' | 'other',
      lastFourDigits: '1234',
      color: '#FFFFFF',
      style: 'gold',
    };

    const result = await createCardUseCase.execute(
      cardData.bankId,
      cardData.name,
      cardData.type,
      cardData.lastFourDigits,
      cardData.color,
      cardData.style
    );

    expect(cardRepository.save).toHaveBeenCalled();
    expect(result.name).toBe(cardData.name);
    expect(result.style).toBe(cardData.style);
  });
});
