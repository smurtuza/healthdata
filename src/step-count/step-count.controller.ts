// src/step-count/step-count.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { StepCountDto } from './dto/step-count.dto';
import { RecordStepCountCommand } from './commands/record-step-count.command';
import { GetStepCountQuery } from './queries/get-step-count.query';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { StepCountService } from './step-count.service';

@ApiTags('step-count')
@Controller('step-count')
export class StepCountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly stepCountService: StepCountService,
  ) {}

  @ApiBody({ type: StepCountDto, description: 'Step Count Data',isArray:true })
  @Post()
  async recordStepCount(@Body() stepCountData: StepCountDto[]): Promise<void> {
    const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordStepCountCommand(userId, stepCountData);
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
}
