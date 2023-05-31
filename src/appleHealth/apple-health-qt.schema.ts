// src/step-count/step-count.schema.ts
import * as mongoose from 'mongoose';

export const AppleHealthQtSchema = new mongoose.Schema({
  userId: {type:String, requited:true},
  startDate: {type:Date, required: true},
  endDate: {type:Date, reqired:true},
  value: { type: Number, required: true },
  unit:{type:String}
});