// src/ingest/commands/ingest-payload.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MqttService } from '../mqtt/mqtt.service';
import { IngestPayloadCommand } from './ingest-payload.command';

@CommandHandler(IngestPayloadCommand)
export class IngestPayloadHandler implements ICommandHandler<IngestPayloadCommand> {
  constructor(private readonly mqttService: MqttService) {}

  async execute(command: IngestPayloadCommand): Promise<void> {
    const { streamName, payload } = command;
    await this.mqttService.publish(streamName, payload);
  }
}
