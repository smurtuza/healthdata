import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppleHealthQtSchema } from '../apple-health-qt.schema';

import { OxygenSaturationController } from './oxygen-saturation.controller';

import { RecordAppleHealthQtCommand } from '../commands/record-apple-health-qt.command';
import { RecordAppleHealthQtHandler } from '../commands/record-apple-health-qt.handler';
import { GetAppleHealthQtHandler, GetLatestAppleHealthHandler } from '../queries/get-apple-health-qt.handler';
import { GetAppleHealthQtQuery, GetLatestAppleHealthQtQuery } from '../queries/get-apple-health-qt.query';
import { AppleHealthQtService } from '../apple-health-qt.service';

@Module({
    imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: 'OxygenSaturation', schema: AppleHealthQtSchema }]),
    ],
    controllers: [OxygenSaturationController],
    providers: [
      RecordAppleHealthQtCommand,
      RecordAppleHealthQtHandler,
      GetAppleHealthQtHandler,
      GetLatestAppleHealthHandler,
      GetAppleHealthQtQuery,
      GetLatestAppleHealthQtQuery,
      AppleHealthQtService,
    ],
  })
  export class OxygenSaturationModule {}
