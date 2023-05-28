// src/sleep/sleep.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SleepDto } from './dto/sleep.dto';

export type SleepDocument = Sleep & Document;

@Schema()
export class Sleep {
  @Prop()
  date: string;

  @Prop()
  hours: number;

  @Prop()
  quality: string;

  @Prop()
  userId: string;

  @Prop()
  source: string;
}

export const SleepSchema = SchemaFactory.createForClass(Sleep);
