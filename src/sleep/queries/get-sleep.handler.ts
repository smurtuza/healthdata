// src/sleep/queries/get-sleep.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Sleep, SleepDocument } from '../sleep.schema';
import { GetSleepQuery , GetLatestSleepQuery} from './get-sleep.query';

@QueryHandler(GetSleepQuery)
export class GetSleepHandler implements IQueryHandler<GetSleepQuery> {
  constructor(
    @InjectModel('Sleep') private readonly sleepModel: Model<any>,
  ) {}

  async execute(query: GetSleepQuery): Promise<any> {
    const { userId, startDate, endDate, source, page, limit } = query;
    const filters: any = { userId };

    if (startDate && endDate) {
      if (startDate) {
        filters.startDate = { $gte: startDate };
      }
      if (endDate) {
        filters.startDate = { ...filters.startDate, $lte: endDate };
      }
    }

    if (source) {
      filters.source = source;
    }

    const total = await this.sleepModel.countDocuments(filters);
    const data = await this.sleepModel
      .find(filters)
      .sort({ startDate: 'desc' })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return {
      total,
      page,
      limit,
      data,
    };
  }
}

@QueryHandler(GetLatestSleepQuery)
export class GetLatestSleepHandler implements IQueryHandler<GetLatestSleepQuery> {
  constructor(
    @InjectModel('Sleep')
    private readonly sleepModel: Model<any>,
  ) {}

  async execute(query: GetLatestSleepQuery): Promise<any> {
    const {userId } = query;

    const sleepData = await this.sleepModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();
    return sleepData;
  }
}