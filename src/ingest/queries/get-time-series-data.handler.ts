// src/ingest/queries/get-time-series-data.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SyllaDBService } from '../sylladb/sylladb.service';
import { GetTimeSeriesDataQuery } from './get-time-series-data.query';

@QueryHandler(GetTimeSeriesDataQuery)
export class GetTimeSeriesDataHandler implements IQueryHandler<GetTimeSeriesDataQuery> {
  constructor(private readonly sylladbService: SyllaDBService) {}

  async execute(query: GetTimeSeriesDataQuery): Promise<any> {
    const { streamName } = query;
    return this.sylladbService.queryTimeSeriesData(streamName);
  }
}
