// apple-health.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SleepDto {
  @ApiProperty({ example: 'Apple Watch', description: 'The data source' })
  @IsString()
  source: string;

  @ApiProperty({ example: '2023-05-25T22:00:00Z', description: 'The start date' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ example: '2023-05-26T06:00:00Z', description: 'The end date' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ example: 28800, description: 'The duration in seconds' })
  @IsNumber()
  duration: number;

  @ApiProperty({
    isArray: true,
    example: [
      {
        type: 'InBed',
        startDate: '2023-05-25T22:00:00Z',
        endDate: '2023-05-26T06:00:00Z',
        duration: 28800,
      },
      {
        type: 'Asleep',
        startDate: '2023-05-25T23:00:00Z',
        endDate: '2023-05-26T05:00:00Z',
        duration: 25200,
      },
      {
        type: 'Restless',
        startDate: '2023-05-26T02:00:00Z',
        endDate: '2023-05-26T02:30:00Z',
        duration: 1800,
      },
    ],
    description: 'The sleep analysis data',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepAnalysisDto)
  sleepAnalysis: SleepAnalysisDto[];
}

export class SleepAnalysisDto {
  @ApiProperty({ example: 'InBed', description: 'The sleep analysis type' })
  @IsString()
  type: string;

  @ApiProperty({ example: '2023-05-25T22:00:00Z', description: 'The start date' })
  @IsDate()
  startDate: Date;

  @ApiProperty({ example: '2023-05-26T06:00:00Z', description: 'The end date' })
  @IsDate()
  endDate: Date;

  @ApiProperty({ example: 28800, description: 'The duration in seconds' })
  @IsNumber()
  duration: number;
}
