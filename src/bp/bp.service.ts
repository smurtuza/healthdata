import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetBpQuery, GetLatestBpQuery } from './queries/get-bp.query';

@Injectable()
export class BpService {
  constructor(private readonly queryBus: QueryBus) {}

  async getBp(query: GetBpQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

  async getLatestBp(query: GetLatestBpQuery): Promise<any> {
    return this.queryBus.execute(query);
  }

}
