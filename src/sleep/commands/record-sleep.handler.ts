// src/sleep/commands/record-sleep.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sleep, SleepDocument } from '../sleep.schema';
import { RecordSleepCommand } from './record-sleep.command';
import { SleepDto } from '../dto/sleep.dto';

@CommandHandler(RecordSleepCommand)
export class RecordSleepHandler implements ICommandHandler<RecordSleepCommand> {
  constructor(
    @InjectModel(Sleep.name) private readonly sleepModel: Model<SleepDocument>,
  ) {}

  async execute(command: RecordSleepCommand): Promise<void> {
    const { userId, sleepData } = command;

    const sleepRecords = sleepData.map(
      (data) =>
        new this.sleepModel({
          ...data,
          userId,
        }),
    );

    await this.sleepModel.create(sleepRecords);
  }
}
