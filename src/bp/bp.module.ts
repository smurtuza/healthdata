import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { BpController } from './bp.controller';
import { BpSchema } from './bp.schema';
import { RecordBpHandler } from './commands/record-bp.handler';
import { RecordBpCommand } from './commands/record-bp.command';
import { GetBpHandler,GetLatestBpHandler } from './queries/get-bp.handler'; //pai Correct import statement
import { GetBpQuery,GetLatestBpQuery } from './queries/get-bp.query';
import { BpService } from './bp.service';


@Module({
    imports: [
      CqrsModule,
      MongooseModule.forFeature([{ name: 'Bp', schema: BpSchema }]),
    ],
    controllers: [BpController],
    providers: [
      BpService,
      RecordBpHandler,
      RecordBpCommand,
      GetBpQuery,
      GetLatestBpQuery,
      GetBpHandler,
      GetLatestBpHandler
    ],
  })
  export class BPModule {}
