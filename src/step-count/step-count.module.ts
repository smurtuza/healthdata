import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { StepCountController } from './step-count.controller';
import { StepCountSchema } from './step-count.schema';
import { RecordStepCountHandler } from './commands/record-step-count.handler';
import { RecordStepCountCommand } from './commands/record-step-count.command';
import { GetStepCountHandler,GetLatestStepCountHandler } from './queries/get-step-count.handler'; //pai Correct import statement
import { GetStepCountQuery,GetLatestStepCountQuery } from './queries/get-step-count.query';
import { StepCountService } from './step-count.service';


@Module({
    imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: 'StepCount', schema: StepCountSchema }]),
    ],
    controllers: [StepCountController],
    providers: [StepCountService,
        RecordStepCountHandler,
        RecordStepCountCommand,
        GetStepCountQuery,
        GetLatestStepCountQuery,
        GetStepCountHandler,
        GetLatestStepCountHandler],
  })
  export class StepCountModule {}
