// src/step-count/queries/get-step-count.query.ts
export class GetStepCountQuery {
    constructor(
      public readonly userId: string,
      public readonly page?: number,
      public readonly limit?: number,
      public readonly startDate?: Date,
      public readonly endDate?: Date,
      public readonly source?: string,
      
    ) {}
  }
  
export class GetLatestStepCountQuery {
  constructor(
    public readonly userId: string
  ) {}
}