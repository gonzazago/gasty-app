import { Card } from '@domain/entities/Card';
import { ICardRepository } from '@domain/repositories/ICardRepository';

/**
 * Caso de uso: Obtener todas las tarjetas
 */
export class GetCardsUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(): Promise<Card[]> {
    return await this.cardRepository.findAll();
  }
}

