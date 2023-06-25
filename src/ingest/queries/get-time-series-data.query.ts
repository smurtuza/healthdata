// src/ingest/queries/get-time-series-data.query.ts
import { IQuery } from '@nestjs/cqrs';

export class GetTimeSeriesDataQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly paramName: string,
    public readonly paramType?: string,
    public readonly startTimestamp?: string,
    public readonly endTimestamp?: string,
    public readonly page?: number,
    public readonly pageSize?: number,
  ) {}
}
