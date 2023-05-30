// src/step-count/step-count.schema.ts
import * as mongoose from 'mongoose';

export const StepCountSchema = new mongoose.Schema({
  userId: {type:String, requited:true},
  source: String,
  startDate: {type:Date, required: true},
  endDate: {type:Date, reqired:true},
  value: { type: Number, required: true },
  
});