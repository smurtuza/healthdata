// src/sleep/dto/sleep.dto.ts
import { IsDateString, IsNumber, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Date } from 'mongoose';

enum SleepQuality {
  POOR = 'poor',
  FAIR = 'fair',
  GOOD = 'good',
}

export class SleepDto {
  @ApiProperty({ example: '2023-05-25T08:00:00Z' })
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ example: 8 })
  @IsNumber()
  readonly hours: number;

  @ApiProperty({ enum: SleepQuality, example: SleepQuality.GOOD })
  @IsEnum(SleepQuality)
  readonly quality: SleepQuality;

  @ApiProperty({ example: 'user123' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ example: 'Apple Health' })
  @IsString()
  readonly source: string;
}
