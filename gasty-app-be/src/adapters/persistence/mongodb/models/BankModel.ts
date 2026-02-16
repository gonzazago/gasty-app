import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz del documento de Bank en MongoDB
 */
export interface IBankDocument extends Document {
  id: string;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema de Mongoose para Bank
 */
const BankSchema = new Schema<IBankDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    collection: 'banks',
  }
);

export const BankModel = mongoose.model<IBankDocument>('Bank', BankSchema);

