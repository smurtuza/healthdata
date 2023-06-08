import { IsArray, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BpDto } from './bp.dto';

export class RecordBpDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty({ type: [BpDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BpDto)
  data: BpDto[];
}