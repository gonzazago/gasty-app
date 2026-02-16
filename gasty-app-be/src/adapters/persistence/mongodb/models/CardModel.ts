import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz del documento de Card en MongoDB
 */
export interface ICardDocument extends Document {
  id: string;
  bankId: string;
  name: string;
  type: 'visa' | 'mastercard' | 'amex' | 'other';
  lastFourDigits: string;
  color: string;
  style: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema de Mongoose para Card
 */
const CardSchema = new Schema<ICardDocument>(
  {
    id: { type: String, required: true, unique: true },
    bankId: { type: String, required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ['visa', 'mastercard', 'amex', 'other'],
      required: true,
    },
    lastFourDigits: { type: String, required: false },
    color: { type: String, required: true },
    style: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'cards',
  }
);

// Índices para mejorar las consultas
CardSchema.index({ bankId: 1 });

export const CardModel = mongoose.model<ICardDocument>('Card', CardSchema);

