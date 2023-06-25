// src/ingest/ingest.controller.ts
import { Body, Controller, Headers, Post, Get, Query } from '@nestjs/common';
import { CommandBus , QueryBus} from '@nestjs/cqrs';
import { IngestPayloadCommand } from './commands/ingest-payload.command';
import {GetTimeSeriesDataQuery} from './queries/get-time-series-data.query'
import { ApiBody } from '@nestjs/swagger';

@Controller('data')
export class IngestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    ) {}

  @Post('/ingest')
  async ingestPayload(
    @Headers('streamName') streamName: string,
    @Body() body: any,
    // Add any other necessary body properties
  ): Promise<void> {
    const command = new IngestPayloadCommand(streamName, body);
    await this.commandBus.execute(command);
  }

  @Get('/fetch')
  async fetchData(@Query() query: any) {
    const { userId, paramName, paramType, startTimestamp, endTimestamp, page, pageSize } = query;
    const fetchDataQuery = new GetTimeSeriesDataQuery(
      userId,
      paramName,
      paramType,
      startTimestamp,
      endTimestamp,
      page,
      pageSize,
    );
    return this.queryBus.execute(fetchDataQuery);
  }
}
