import { Bank } from '@domain/entities/Bank';
import { IBankRepository } from '@domain/repositories/IBankRepository';
import { BankModel, IBankDocument } from './models/BankModel';

/**
 * Adaptador de persistencia: Repositorio MongoDB para bancos
 */
export class MongoBankRepository implements IBankRepository {
  private mapToDomain(document: IBankDocument): Bank {
    return new Bank(
      document.id,
      document.name,
      document.balance,
      document.createdAt,
      document.updatedAt
    );
  }

  private mapToDocument(bank: Bank): Partial<IBankDocument> {
    return {
      id: bank.id,
      name: bank.name,
      balance: bank.balance,
    };
  }

  async findById(id: string): Promise<Bank | null> {
    const document = await BankModel.findOne({ id }).exec();
    return document ? this.mapToDomain(document) : null;
  }

  async findAll(): Promise<Bank[]> {
    const documents = await BankModel.find().exec();
    return documents.map((doc) => this.mapToDomain(doc));
  }

  async save(bank: Bank): Promise<Bank> {
    const document = new BankModel(this.mapToDocument(bank));
    await document.save();
    return this.mapToDomain(document);
  }

  async update(bank: Bank): Promise<Bank> {
    bank.updateTimestamp();
    const document = await BankModel.findOneAndUpdate(
      { id: bank.id },
      this.mapToDocument(bank),
      { new: true }
    ).exec();

    if (!document) {
      throw new Error('Banco no encontrado');
    }

    return this.mapToDomain(document);
  }

  async delete(id: string): Promise<void> {
    const result = await BankModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Banco no encontrado');
    }
  }
}

