// src/step-count/step-count.controller.ts
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CaloriesDto } from './dto/calories.dto';
import { RecordCaloriesCommand } from './commands/record-calories.command';
import { GetLatestCaloriesQuery, GetCaloriesQuery } from './queries/get-calories.query';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CaloriesService } from './calories.service';

@ApiTags('calories')
@Controller('calories')
export class CaloriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly caloriesService: CaloriesService,
  ) {}

  @ApiBody({ type: CaloriesDto, description: 'Calories Burnt Data',isArray:true })
  @Post()
  async recordStepCount(@Body() stepCountData: CaloriesDto[]): Promise<void> {
    const userId = 'user123'; // Replace with your authentication logic to get the user ID
    const command = new RecordCaloriesCommand(userId, stepCountData);
    await this.commandBus.execute(command);
  }

  @ApiOperation({ summary: 'Get Calories Burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'source', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getCalories(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('source') source: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<any> {
    const query = new GetCaloriesQuery(userId, startDate ? new Date(startDate) : undefined, endDate ? new Date(endDate) : undefined, source, page, limit);
    return this.caloriesService.getCalories(query);
  }


  @ApiOperation({ summary: 'Get latest calories burnt data' })
  @ApiQuery({ name: 'userId', required: true })
  @Get('/latest')
  async getLatestCalories(
    @Query('userId') userId: string,
  ): Promise<any> {
    const query = new GetLatestCaloriesQuery(userId);
    return this.caloriesService.getLatestCalories(query);
  }

}
