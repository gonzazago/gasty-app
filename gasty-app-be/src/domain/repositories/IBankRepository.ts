import { Bank } from '../entities/Bank';

/**
 * Puerto (Port) - Interfaz para el repositorio de bancos
 * Define el contrato que deben cumplir los adaptadores de persistencia
 */
export interface IBankRepository {
  findById(id: string): Promise<Bank | null>;
  findAll(): Promise<Bank[]>;
  save(bank: Bank): Promise<Bank>;
  update(bank: Bank): Promise<Bank>;
  delete(id: string): Promise<void>;
}

