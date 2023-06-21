// src/sylladb/sylladb.service.ts
import { Injectable } from '@nestjs/common';
// import { SyllaDBClient, QueryResult } from 'sylladb';

@Injectable()
export class SyllaDBService {
//   private readonly sylladbClient: SyllaDBClient;

//   constructor() {
//     // Initialize the SyllaDB client and connect to the database
//     this.sylladbClient = new SyllaDBClient({
//       // Configure the connection details for SyllaDB
//       host: 'your-sylladb-host',
//       port: 5432,
//       database: 'your-database-name',
//       user: 'your-username',
//       password: 'your-password',
//     });
//     this.sylladbClient.connect();
//   }

//   async queryTimeSeriesData(query: string): Promise<QueryResult> {
//     // Execute the time series data query
//     return this.sylladbClient.query(query);
//   }
   async queryTimeSeriesData(query: string): Promise<any> {
    return "test"
   }
}
