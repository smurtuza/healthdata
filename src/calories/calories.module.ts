import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CaloriesController } from './calories.controller';
import { CaloriesSchema } from './calories.schema';
import { RecordCaloriesCommand } from './commands/record-calories.command';
import { RecordCaloriesHandler } from './commands/record-calories.handler';
import { GetCaloriesHandler, GetLatestCaloriesHandler } from './queries/get-calories.handler';
import { GetCaloriesQuery, GetLatestCaloriesQuery } from './queries/get-calories.query';
import { CaloriesService } from './calories.service';

@Module({
    imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: 'Calories', schema: CaloriesSchema }]),
    ],
    controllers: [CaloriesController],
    providers: [CaloriesService,
        RecordCaloriesCommand,
        RecordCaloriesHandler,
        GetCaloriesHandler,
        GetLatestCaloriesHandler,
        GetCaloriesQuery,
        GetLatestCaloriesQuery],
  })
  export class CaloriesModule {}
