// src/step-count/commands/record-step-count.command.ts
import { CaloriesDto } from "../dto/calories.dto";
export class RecordCaloriesCommand {
    constructor(
      public readonly userId: string,
      public readonly caloriesData: CaloriesDto[],
    ) {}
  }
  