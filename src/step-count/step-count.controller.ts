// src/step-count/step-count.controller.ts
import { Body, Controller, Get, Post, Query ,ValidationPipe} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { StepCountDto } from './dto/step-count.dto';
import { RecordStepCountCommand } from './commands/record-step-count.command';
import { GetLatestStepCountQuery, GetStepCountQuery } from './queries/get-step-count.query';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { StepCountService } from './step-count.service';
import { RecordStepCountDto } from './dto/record-step-count.dto';

@ApiTags('step-count')
@Controller('step-count')
export class StepCountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly stepCountService: StepCountService,
  ) {}

  @ApiBody({ type: RecordStepCountDto, description: 'Step Count Data',isArray:true })
  @Post()
  async recordStepCount(@Body(ValidationPipe) body: RecordStepCountDto): Promise<void> {
    const { userId, data } = body;

    // const data = data.map((item) => ([{
    //   source: item.source,
    //   startDate: item.startDate,
    //   endDate: item.endDate,
    //   value: item.value,
    // }]));
    // const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordStepCountCommand(userId, data);
    await this.commandBus.execute(command);
  }

  @ApiOperation({ summary: 'Get step count data' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getStepCount(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const query = new GetStepCountQuery(userId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source, page, limit);
    return this.stepCountService.getStepCount(query);
  }


  @ApiOperation({ summary: 'Get latest step count data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestStepCount(
    @Query('userId') userId: string,
  ): Promise<any> {
    const query = new GetLatestStepCountQuery(userId);
    return this.stepCountService.getLatestStepCount(query);
  }

}
