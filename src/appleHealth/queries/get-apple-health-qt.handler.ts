// src/step-count/queries/get-step-count.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetAppleHealthQtQuery,GetLatestAppleHealthQtQuery } from './get-apple-health-qt.query';

@QueryHandler(GetAppleHealthQtQuery)
export class GetAppleHealthQtHandler implements IQueryHandler<GetAppleHealthQtQuery> {
  constructor(
    // @InjectModel('OxygenSaturation')
    // @InjectModel('HearRate') 
    // private readonly appleHealthQtModel: Model<any>,
  ) {}

  async execute(query: GetAppleHealthQtQuery): Promise<any> {
    const {appleHealthQtModel, userId, startDate, endDate, source, page, limit } = query;

    const filter: any = {
      userId,
    };

    if (startDate) {
      filter.date = { $gte: startDate };
    }

    if (endDate) {
      filter.date = { ...filter.date, $lte: endDate };
    }

    if (source) {
      filter.source = source;
    }

    const queryBuilder = appleHealthQtModel
      .find(filter)
      .sort({ date: 'asc' });

    if (page && limit) {
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).limit(limit);
    }

    return queryBuilder.exec();
  }
}

@QueryHandler(GetLatestAppleHealthQtQuery)
export class GetLatestAppleHealthHandler implements IQueryHandler<GetLatestAppleHealthQtQuery> {
  constructor(
    // @InjectModel('HearRate')
    // private readonly appleHealthQtModel: Model<any>,
  ) {}

  async execute(query: GetLatestAppleHealthQtQuery): Promise<any> {
    const { appleHealthQtModel,userId } = query;

    const stepCount = await appleHealthQtModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();

    return stepCount;
  }
}
