import * as mongoose from 'mongoose';

export const BpSchema = new mongoose.Schema({
  userId: {type:String, requited:true},
  source: {String},
  startDate: {type:Date, required: true},
  endDate: {type:Date, reqired:true},
  systolic: { type: Number, required: true },
  diastolic: { type: Number, required: true },
  unit : {type: String}
});