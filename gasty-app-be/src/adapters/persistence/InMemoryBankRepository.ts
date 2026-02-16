import { Bank } from '@domain/entities/Bank';
import { IBankRepository } from '@domain/repositories/IBankRepository';

/**
 * Adaptador de persistencia: Repositorio en memoria para bancos
 * Esta es una implementación temporal. En producción se reemplazaría
 * por un adaptador que use una base de datos real
 */
export class InMemoryBankRepository implements IBankRepository {
  private banks: Map<string, Bank> = new Map();

  async findById(id: string): Promise<Bank | null> {
    return this.banks.get(id) || null;
  }

  async findAll(): Promise<Bank[]> {
    return Array.from(this.banks.values());
  }

  async save(bank: Bank): Promise<Bank> {
    this.banks.set(bank.id, bank);
    return bank;
  }

  async update(bank: Bank): Promise<Bank> {
    if (!this.banks.has(bank.id)) {
      throw new Error('Banco no encontrado');
    }
    bank.updateTimestamp();
    this.banks.set(bank.id, bank);
    return bank;
  }

  async delete(id: string): Promise<void> {
    if (!this.banks.has(id)) {
      throw new Error('Banco no encontrado');
    }
    this.banks.delete(id);
  }
}

