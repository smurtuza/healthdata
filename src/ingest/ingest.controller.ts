// src/ingest/ingest.controller.ts
import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IngestPayloadCommand } from './commands/ingest-payload.command';

@Controller('ingest')
export class IngestController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async ingestPayload(
    @Headers('streamName') streamName: string,
    @Body('payload') payload: any,
    // Add any other necessary body properties
  ): Promise<void> {
    const command = new IngestPayloadCommand(streamName, payload);
    await this.commandBus.execute(command);
  }
}
