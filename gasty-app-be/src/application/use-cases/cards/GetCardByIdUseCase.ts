import { Card } from '@domain/entities/Card';
import { ICardRepository } from '@domain/repositories/ICardRepository';

/**
 * Caso de uso: Obtener una tarjeta por ID
 */
export class GetCardByIdUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(id: string): Promise<Card | null> {
    return await this.cardRepository.findById(id);
  }
}

