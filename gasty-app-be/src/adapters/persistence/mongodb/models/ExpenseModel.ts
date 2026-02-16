import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz del documento de Expense en MongoDB
 */
export interface IExpenseDocument extends Document {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
  bankId?: string;
  cardId?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema de Mongoose para Expense
 */
const ExpenseSchema = new Schema<IExpenseDocument>(
  {
    id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    bankId: { type: String, required: false },
    cardId: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: 'expenses',
  }
);

// Índices para mejorar las consultas
ExpenseSchema.index({ date: 1 });
ExpenseSchema.index({ cardId: 1 });
ExpenseSchema.index({ bankId: 1 });

export const ExpenseModel = mongoose.model<IExpenseDocument>('Expense', ExpenseSchema);

