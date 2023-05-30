// src/step-count/queries/get-step-count.query.ts
export class GetCaloriesQuery {
    constructor(
      public readonly userId: string,
      public readonly startDate?: Date,
      public readonly endDate?: Date,
      public readonly source?: string,
      public readonly page?: number,
      public readonly limit?: number,
    ) {}
  }
  
export class GetLatestCaloriesQuery {
  constructor(
    public readonly userId: string
  ) {}
}