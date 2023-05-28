// src/sleep/queries/get-sleep.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sleep, SleepDocument } from '../sleep.schema';
import { GetSleepQuery } from './get-sleep.query';

@QueryHandler(GetSleepQuery)
export class GetSleepHandler implements IQueryHandler<GetSleepQuery> {
  constructor(
    @InjectModel(Sleep.name) private readonly sleepModel: Model<SleepDocument>,
  ) {}

  async execute(query: GetSleepQuery): Promise<any> {
    const { userId, startDate, endDate, source, page, limit } = query;
    const filters: any = { userId };

    if (startDate && endDate) {
      filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      filters.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      filters.date = { $lte: new Date(endDate) };
    }

    if (source) {
      filters.source = source;
    }

    const total = await this.sleepModel.countDocuments(filters);
    const data = await this.sleepModel
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: 'desc' });

    return {
      total,
      page,
      limit,
      data,
    };
  }
}
