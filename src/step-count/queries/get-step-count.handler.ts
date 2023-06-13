// src/step-count/queries/get-step-count.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetStepCountQuery ,GetLatestStepCountQuery} from './get-step-count.query';

@QueryHandler(GetStepCountQuery)
export class GetStepCountHandler implements IQueryHandler<GetStepCountQuery> {
  constructor(
    @InjectModel('StepCount') private readonly stepCountModel: Model<any>,
  ) {}

  async execute(query: GetStepCountQuery): Promise<any> {
    const { userId, startDate, endDate, source, page, limit } = query;

    const filter: any = {
      userId,
    };

    if (startDate && endDate) {
      if (startDate) {
        filter.startDate = { $gte: startDate };
      }
      if (endDate) {
        filter.startDate = { ...filter.startDate, $lte: endDate };
      }
    }

    if (source) {
      filter.source = source;
    }
    const total = await this.stepCountModel.countDocuments(filter);
    const data = await this.stepCountModel
      .find(filter)
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

@QueryHandler(GetLatestStepCountQuery)
export class GetLatestStepCountHandler implements IQueryHandler<GetLatestStepCountQuery> {
  constructor(
    @InjectModel('StepCount')
    private readonly stepCountModel: Model<any>,
  ) {}

  async execute(query: GetLatestStepCountQuery): Promise<any> {
    const { userId } = query;

    const stepCount = await this.stepCountModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();

    return stepCount;
  }
}
