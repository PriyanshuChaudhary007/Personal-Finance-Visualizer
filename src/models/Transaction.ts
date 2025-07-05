


import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
  category?: string;
}

const TransactionSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, default: 'Uncategorized' },
  },
  { timestamps: true }
);

export default models.Transaction ||
  model<ITransaction>('Transaction', TransactionSchema);
