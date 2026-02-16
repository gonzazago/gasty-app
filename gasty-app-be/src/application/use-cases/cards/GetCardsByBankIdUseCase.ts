import { Card } from '@domain/entities/Card';
import { ICardRepository } from '@domain/repositories/ICardRepository';

/**
 * Caso de uso: Obtener tarjetas por ID de banco
 */
export class GetCardsByBankIdUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(bankId: string): Promise<Card[]> {
    return await this.cardRepository.findByBankId(bankId);
  }
}

