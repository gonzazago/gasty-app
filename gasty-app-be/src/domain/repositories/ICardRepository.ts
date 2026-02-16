import { Card } from '../entities/Card';

/**
 * Puerto (Port) - Interfaz para el repositorio de tarjetas
 * Define el contrato que deben cumplir los adaptadores de persistencia
 */
export interface ICardRepository {
  findById(id: string): Promise<Card | null>;
  findAll(): Promise<Card[]>;
  findByBankId(bankId: string): Promise<Card[]>;
  save(card: Card): Promise<Card>;
  update(card: Card): Promise<Card>;
  delete(id: string): Promise<void>;
}

