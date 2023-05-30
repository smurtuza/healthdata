// src/calories/dto/calories.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class CaloriesDto {
  @ApiProperty({ example: 'user123' })
  @IsString()
  userId: String;

  @ApiProperty({ example: '2023-05-25T08:00:00Z' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ example: '2023-05-25T08:00:00Z' })
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: 4000})
  @IsNumber()
  value: { type: Number, required: true };

  @ApiProperty({ example: 'kCal'})
  @IsString()
  unit: { type: String, required: true };
}