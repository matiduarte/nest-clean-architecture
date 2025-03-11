import * as mongoose from 'mongoose';

export const GreetingSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

export interface GreetingDocument extends mongoose.Document {
  message: string;
}
