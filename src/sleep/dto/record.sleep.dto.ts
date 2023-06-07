import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SleepDto } from './sleep.dto';

export class RecordSleepDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: [SleepDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SleepDto)
  data: SleepDto[];
}