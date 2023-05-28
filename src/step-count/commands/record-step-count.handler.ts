// src/step-count/commands/record-step-count.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordStepCountCommand } from './record-step-count.command';
import { StepCountSchema } from '../step-count.schema';

@CommandHandler(RecordStepCountCommand)
export class RecordStepCountHandler implements ICommandHandler<RecordStepCountCommand> {
  constructor(
    @InjectModel('StepCount') private readonly stepCountModel: Model<any>,
  ) {}

  async execute(command: RecordStepCountCommand): Promise<void> {
    const { userId, stepCountData } = command;

    const stepCounts = stepCountData.map((data) => ({
      userId,
      ...data,
    }));

    await this.stepCountModel.create(stepCounts);
  }
}
