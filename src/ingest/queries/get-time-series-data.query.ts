// src/ingest/queries/get-time-series-data.query.ts
import { IQuery } from '@nestjs/cqrs';

export class GetTimeSeriesDataQuery implements IQuery {
  constructor(
    public readonly streamName: string,
    // Add any other necessary properties
  ) {}
}
