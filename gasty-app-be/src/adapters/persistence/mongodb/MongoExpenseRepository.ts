import { Expense } from '@domain/entities/Expense';
import { IExpenseRepository } from '@domain/repositories/IExpenseRepository';
import { ExpenseModel, IExpenseDocument } from './models/ExpenseModel';

/**
 * Adaptador de persistencia: Repositorio MongoDB para gastos
 */
export class MongoExpenseRepository implements IExpenseRepository {
  private mapToDomain(document: IExpenseDocument): Expense {
    return new Expense({
      id: document.id,
      amount: document.amount,
      description: document.description,
      category: document.category,
      date: document.date,
      bankId: document.bankId || '',
      cardId: document.cardId,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  private mapToDocument(expense: Expense): Partial<IExpenseDocument> {
    return {
      id: expense.id,
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      date: expense.date,
      bankId: expense.bankId,
      cardId: expense.cardId,
    };
  }

  async findById(id: string): Promise<Expense | null> {
    const document = await ExpenseModel.findOne({ id }).exec();
    return document ? this.mapToDomain(document) : null;
  }

  async findAll(): Promise<Expense[]> {
    const documents = await ExpenseModel.find().exec();
    return documents.map((doc) => this.mapToDomain(doc));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    const documents = await ExpenseModel.find({
      date: { $gte: startDate, $lte: endDate },
    }).exec();
    return documents.map((doc) => this.mapToDomain(doc));
  }

  async save(expense: Expense): Promise<Expense> {
    const document = new ExpenseModel(this.mapToDocument(expense));
    await document.save();
    return this.mapToDomain(document);
  }

  async update(expense: Expense): Promise<Expense> {
    expense.updateTimestamp();
    const document = await ExpenseModel.findOneAndUpdate(
      { id: expense.id },
      this.mapToDocument(expense),
      { new: true }
    ).exec();

    if (!document) {
      throw new Error('Gasto no encontrado');
    }

    return this.mapToDomain(document);
  }

  async delete(id: string): Promise<void> {
    const result = await ExpenseModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Gasto no encontrado');
    }
  }
}

