// src/ingest/commands/ingest-payload.command.ts
import { ICommand } from '@nestjs/cqrs';

export class IngestPayloadCommand implements ICommand {
  constructor(
    public readonly streamName: string,
    public readonly payload: any,
    // Add any other necessary properties
  ) {}
}