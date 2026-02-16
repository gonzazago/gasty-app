import { BaseEntity } from './BaseEntity';

/**
 * Entidad de dominio: Bank (Banco)
 * Representa un banco en el sistema
 */
export class Bank extends BaseEntity {
  name: string;
  balance: number;

  constructor(
    id: string,
    name: string,
    balance: number = 0,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.balance = balance;
  }

  /**
   * Valida que el banco tenga datos válidos
   */
  isValid(): boolean {
    return this.name.trim().length > 0;
  }

  /**
   * Actualiza el balance del banco
   */
  updateBalance(amount: number): void {
    this.balance += amount;
    this.updateTimestamp();
  }
}

