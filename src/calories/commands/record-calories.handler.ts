// src/calories/commands/record-calories.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordCaloriesCommand } from './record-calories.command';
import { CaloriesSchema } from '../calories.schema';

@CommandHandler(RecordCaloriesCommand)
export class RecordCaloriesHandler implements ICommandHandler<RecordCaloriesCommand> {
  constructor(
    @InjectModel('Calories') private readonly caloriesModel: Model<any>,
  ) {}

  async execute(command: RecordCaloriesCommand): Promise<void> {
    const { userId, caloriesData } = command;

    const calories = caloriesData.map((data) => ({
      userId,
      ...data,
    }));

    await this.caloriesModel.create(calories);
  }
}
