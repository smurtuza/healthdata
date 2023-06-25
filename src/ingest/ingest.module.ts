// src/app.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { IngestPayloadHandler } from './commands/ingest-payload.handler';
import { GetTimeSeriesDataHandler } from './queries/get-time-series-data.handler';
import { IngestController } from './ingest.controller';
import { MqttService } from './mqtt/mqtt.service';
import { ScylladbService } from './scylladb/scylladb.service';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [
    IngestController,
  ],
  providers: [
    MqttService,
    IngestPayloadHandler,
    GetTimeSeriesDataHandler,
    ScylladbService
  ],
})
export class IngestModule {}
