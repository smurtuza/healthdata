import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordBpCommand } from './record-bp.command';

@CommandHandler(RecordBpCommand)
export class RecordBpHandler implements ICommandHandler<RecordBpCommand> {
  constructor(
    @InjectModel('Bp') private readonly bpModel: Model<any>,
  ) {}

  async execute(command: RecordBpCommand): Promise<void> {
    const { userId, bpData } = command;

    const bp = bpData.map((data) => ({
      userId,
      ...data,
    }));

    await this.bpModel.create(bp);
  }
}
