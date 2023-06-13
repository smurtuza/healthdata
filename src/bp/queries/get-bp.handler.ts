import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetBpQuery ,GetLatestBpQuery} from './get-bp.query';

@QueryHandler(GetBpQuery)
export class GetBpHandler implements IQueryHandler<GetBpQuery> {
  constructor(
    @InjectModel('Bp') private readonly BpModel: Model<any>,
  ) {}

  async execute(query: GetBpQuery): Promise<any> {
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
    const total = await this.BpModel.countDocuments(filter);
    const data = await this.BpModel
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

@QueryHandler(GetLatestBpQuery)
export class GetLatestBpHandler implements IQueryHandler<GetLatestBpQuery> {
  constructor(
    @InjectModel('Bp')
    private readonly BpModel: Model<any>,
  ) {}

  async execute(query: GetLatestBpQuery): Promise<any> {
    const { userId } = query;

    const BP = await this.BpModel
      .findOne({ userId })
      .sort({ endDate: 'desc' })
      .exec();

    return BP;
  }
}
