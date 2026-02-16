import { BaseEntity } from './BaseEntity';

/**
 * Entidad de dominio: Card (Tarjeta)
 * Representa una tarjeta de crédito/débito en el sistema
 */
export class Card extends BaseEntity {
  bankId: string;
  name: string;
  type: 'visa' | 'mastercard' | 'amex' | 'other';
  lastFourDigits: string;
  color: string;
  style: string;

  constructor(
    id: string,
    bankId: string,
    name: string,
    type: 'visa' | 'mastercard' | 'amex' | 'other',
    lastFourDigits: string,
    color: string,
    style: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.bankId = bankId;
    this.name = name;
    this.type = type;
    this.lastFourDigits = lastFourDigits;
    this.color = color;
    this.style = style;
  }

  /**
   * Valida que la tarjeta tenga datos válidos
   */
  isValid(): boolean {
    return (
      this.bankId.trim().length > 0 &&
      this.name.trim().length > 0
    );
  }
}

