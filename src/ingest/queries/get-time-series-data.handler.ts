// src/ingest/queries/get-time-series-data.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ScylladbService } from '../scylladb/scylladb.service';
import { GetTimeSeriesDataQuery } from './get-time-series-data.query';
import { Client } from 'cassandra-driver';


@QueryHandler(GetTimeSeriesDataQuery)
export class GetTimeSeriesDataHandler implements IQueryHandler<GetTimeSeriesDataQuery> {
  constructor(private readonly scylladbService: ScylladbService) {}

  // private client: Client;

  // constructor() {
  //   this.client = new Client({
  //     contactPoints: ['15.207.62.22'], // Replace with your Cassandra contact points
  //     localDataCenter: 'datacenter1', // Replace with your Cassandra data center
  //     credentials: { username: "data_reader", password: "m$gzV498c@"}, 
  //     keyspace: 'securra_test', 
  //   });
  //   this.client.connect();
  // }

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
      ORDER BY timestamp DESC
      LIMIT ?
      ALLOW FILTERING
    `;

    const params: any[] = [userId, paramName];

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
