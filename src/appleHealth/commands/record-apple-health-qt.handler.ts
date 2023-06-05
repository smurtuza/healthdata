// src/calories/commands/record-calories.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordAppleHealthQtCommand } from './record-apple-health-qt.command';

@CommandHandler(RecordAppleHealthQtCommand)
export class RecordAppleHealthQtHandler implements ICommandHandler<RecordAppleHealthQtCommand> {
  constructor(
    // @InjectModel('HearRate')
    // private readonly appleHealthQtModel: Model<any>,
  ) {}

  async execute(command: RecordAppleHealthQtCommand): Promise<void> {
    const { userId, appleHealthData, appleHealthQtModel } = command;

    const healthData = appleHealthData.map((data) => ({
      userId,
      ...data,
    }));

    await appleHealthQtModel.create(healthData);
  }
}
