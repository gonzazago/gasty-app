import { Card } from '@domain/entities/Card';
import { ICardRepository } from '@domain/repositories/ICardRepository';

/**
 * Caso de uso: Crear una nueva tarjeta
 */
export class CreateCardUseCase {
  constructor(private cardRepository: ICardRepository) {}

  async execute(
    bankId: string,
    name: string,
    type: 'visa' | 'mastercard' | 'amex' | 'other',
    lastFourDigits: string,
    color: string
  ): Promise<Card> {
    // Generar ID
    const id = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Crear la entidad de dominio
    const card = new Card(id, bankId, name, type, lastFourDigits, color);

    // Validar la entidad
    if (!card.isValid()) {
      throw new Error('La tarjeta no es válida');
    }

    // Persistir usando el repositorio
    return await this.cardRepository.save(card);
  }
}

