// src/step-count/dto/step-count.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class StepCountDto {
  @ApiProperty({ example: 'user123' })
  @IsString()
  userId: String;

  @ApiProperty({ example: 4000})
  @IsNumber()
  stepCount: { type: Number, required: true };

  @ApiProperty({example: 'Apple Health'})
  @IsString()
  source: string;

  @ApiProperty({ example: '2023-05-25T08:00:00Z' })
  @IsDateString()
  date: Date;

}