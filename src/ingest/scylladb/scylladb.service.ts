// src/scylladb/scylladb.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'cassandra-driver';

@Injectable()
export class ScylladbService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor() {}

  async onModuleInit() {
    try {
      this.client = new Client({
        contactPoints: ['15.207.62.22'], // Replace with your Cassandra contact points
        localDataCenter: 'datacenter1', // Replace with your Cassandra data center
        credentials: { username: "data_reader", password: "m$gzV498c@"}, 
        keyspace: 'securra_test', 
      });
      await this.client.connect();
      console.log('Connected to Cassandra');
    } catch (error) {
      console.error('Failed to connect to Cassandra', error);
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.shutdown();
      console.log('Disconnected from Cassandra');
    }
  }

  getClient(): Client {
    return this.client;
  }
}
