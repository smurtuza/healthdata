// src/step-count/step-count.schema.ts
import * as mongoose from 'mongoose';

export const StepCountSchema = new mongoose.Schema({
  userId: String,
  date: Date,
  stepCount: { type: Number, required: true },
  source: String,
});
