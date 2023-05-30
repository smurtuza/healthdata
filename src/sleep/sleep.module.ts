import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { SleepController } from './sleep.controller';
import { SleepSchema } from './sleep.schema';
import { RecordSleepHandler } from './commands/record-sleep.handler';
import { RecordSleepCommand } from './commands/record-sleep.command';
import {GetSleepQuery} from './queries/get-sleep.query';
import { GetSleepHandler } from './queries/get-sleep.handler';
import { SleepService } from './sleep.service';

@Module({
    imports : [CqrsModule,MongooseModule.forFeature([{ name: 'Sleep', schema: SleepSchema }])],
    controllers: [SleepController],
    providers: [SleepService,
        RecordSleepHandler,
        RecordSleepCommand,
        GetSleepHandler,
        GetSleepQuery,],
  })
export class SleepModule {}