import { Card } from '@domain/entities/Card';
import { ICardRepository } from '@domain/repositories/ICardRepository';
import { CardModel, ICardDocument } from './models/CardModel';

/**
 * Adaptador de persistencia: Repositorio MongoDB para tarjetas
 */
export class MongoCardRepository implements ICardRepository {
  private mapToDomain(document: ICardDocument): Card {
    return new Card(
      document.id,
      document.bankId,
      document.name,
      document.type,
      document.lastFourDigits,
      document.color,
      document.createdAt,
      document.updatedAt
    );
  }

  private mapToDocument(card: Card): Partial<ICardDocument> {
    return {
      id: card.id,
      bankId: card.bankId,
      name: card.name,
      type: card.type,
      lastFourDigits: card.lastFourDigits,
      color: card.color,
    };
  }

  async findById(id: string): Promise<Card | null> {
    const document = await CardModel.findOne({ id }).exec();
    return document ? this.mapToDomain(document) : null;
  }

  async findAll(): Promise<Card[]> {
    const documents = await CardModel.find().exec();
    return documents.map((doc) => this.mapToDomain(doc));
  }

  async findByBankId(bankId: string): Promise<Card[]> {
    const documents = await CardModel.find({ bankId }).exec();
    return documents.map((doc) => this.mapToDomain(doc));
  }

  async save(card: Card): Promise<Card> {
    const document = new CardModel(this.mapToDocument(card));
    await document.save();
    return this.mapToDomain(document);
  }

  async update(card: Card): Promise<Card> {
    card.updateTimestamp();
    const document = await CardModel.findOneAndUpdate(
      { id: card.id },
      this.mapToDocument(card),
      { new: true }
    ).exec();

    if (!document) {
      throw new Error('Tarjeta no encontrada');
    }

    return this.mapToDomain(document);
  }

  async delete(id: string): Promise<void> {
    const result = await CardModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Tarjeta no encontrada');
    }
  }
}

