// src/sleep/commands/record-sleep.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordSleepCommand } from './record-sleep.command';

import { SleepSchema } from '../sleep.schema';
import { SleepDto } from '../dto/sleep.dto';

@CommandHandler(RecordSleepCommand)
export class RecordSleepHandler implements ICommandHandler<RecordSleepCommand> {
  constructor(
    @InjectModel("Sleep") private readonly sleepModel: Model<any>,
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
