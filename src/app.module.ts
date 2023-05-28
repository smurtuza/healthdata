// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { SleepController } from './sleep/sleep.controller';
import { SleepSchema } from './sleep/sleep.schema';
import { RecordSleepHandler } from './sleep/commands/record-sleep.handler';
import { RecordSleepCommand } from './sleep/commands/record-sleep.command';
import { GetSleepHandler } from './sleep/queries/get-sleep.handler';
import { SleepService } from './sleep/sleep.service';
import { StepCountController } from './step-count/step-count.controller';
import { StepCountSchema } from './step-count/step-count.schema';
import { RecordStepCountHandler } from './step-count/commands/record-step-count.handler';
import { RecordStepCountCommand } from './step-count/commands/record-step-count.command';
import { GetStepCountHandler } from './step-count/queries/get-step-count.handler'; //pai Correct import statement
import { GetStepCountQuery } from './step-count/queries/get-step-count.query';
import { StepCountService } from './step-count/step-count.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/sleep_db'),
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Sleep', schema: SleepSchema },{ name: 'StepCount', schema: StepCountSchema }]),
  ],
  controllers: [SleepController,StepCountController],
  providers: [
    SleepService,
    RecordSleepHandler,
    RecordSleepCommand,
    GetSleepHandler,
    StepCountService,
    RecordStepCountHandler,
    RecordStepCountCommand,
    GetStepCountQuery,
    GetStepCountHandler,
  ],
})
export class AppModule {}
