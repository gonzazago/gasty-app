import { Bank } from '@domain/entities/Bank';
import { IBankRepository } from '@domain/repositories/IBankRepository';

/**
 * Caso de uso: Crear un nuevo banco
 */
export class CreateBankUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(name: string, balance: number = 0): Promise<Bank> {
    // Generar ID
    const id = `bank-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Crear la entidad de dominio
    const bank = new Bank(id, name, balance);

    // Validar la entidad
    if (!bank.isValid()) {
      throw new Error('El banco no es válido');
    }

    // Persistir usando el repositorio
    return await this.bankRepository.save(bank);
  }
}

