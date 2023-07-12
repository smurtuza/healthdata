// src/ingest/queries/get-time-series-data.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScylladbService } from '../scylladb/scylladb.service';
import { GetTimeSeriesDataQuery } from './get-time-series-data.query';
import { Client } from 'cassandra-driver';


@QueryHandler(GetTimeSeriesDataQuery)
export class GetTimeSeriesDataHandler implements IQueryHandler<GetTimeSeriesDataQuery> {
  constructor(private readonly scylladbService: ScylladbService) { }
  async execute(query: GetTimeSeriesDataQuery): Promise<any> {
    const { userId, paramName, paramType, startTimestamp, endTimestamp, page, pageSize } = query;
    const client = this.scylladbService.getClient();

    const queryString = `
      SELECT * FROM glucometer_readings
      WHERE userid = ?
      ${paramName ? 'AND paramname' : ''}
      ${paramType ? 'AND paramtype = ?' : ''}
      ${startTimestamp ? 'AND timestamp >= ?' : ''}
      ${endTimestamp ? 'AND timestamp <= ?' : ''}
      ORDER BY date_time DESC
      LIMIT ?
      ALLOW FILTERING
    `;

    const params: any[] = [userId];

    if (paramName) {
      params.push(paramName)
    }
    if (paramType) {
      params.push(paramType);
    }
    if (startTimestamp) {
      params.push(new Date(startTimestamp));
    }
    if (endTimestamp) {
      params.push(new Date(endTimestamp));
    }
    params.push(pageSize);

    const result = await client.execute(queryString, params, { prepare: true });

    const totalCount = result.rowLength;

    const totalPages = Math.ceil(totalCount / pageSize);

    const results = result.rows;

    return {
      page,
      pageSize,
      totalPages,
      totalCount,
      results,
    };
  }
}
