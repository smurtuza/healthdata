import * as mongoose from 'mongoose';

export const SleepSchema = new mongoose.Schema({
  userId: {type:String, requited:true},
  source: String,
  sleepHours: Number,
  startDate: {type:Date, required: true},
  endDate: {type:Date, reqired:true},
  value: { type: String, required: true },
  
});