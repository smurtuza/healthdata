// apple-health.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString,  IsDateString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Date } from 'mongoose';

export class SleepDto {
  @ApiProperty({ example: 'Apple Watch', description: 'The data source' })
  @IsString()
  source: string;

  @ApiProperty({ example: '2023-05-25T22:00:00Z', description: 'The start date' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2023-05-26T06:00:00Z', description: 'The end date' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: 28800, description: 'The duration in seconds' })
  @IsNumber()
  sleepHours: number;

  @ApiProperty({ example: "InBed/Asleep/Restless", description: 'Type of sleep' })
  @IsString()
  value: string;

 }