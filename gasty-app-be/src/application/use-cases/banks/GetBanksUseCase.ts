import { Bank } from '@domain/entities/Bank';
import { IBankRepository } from '@domain/repositories/IBankRepository';

/**
 * Caso de uso: Obtener todos los bancos
 */
export class GetBanksUseCase {
  constructor(private bankRepository: IBankRepository) {}

  async execute(): Promise<Bank[]> {
    return await this.bankRepository.findAll();
  }
}

