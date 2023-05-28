// src/step-count/queries/get-step-count.query.ts
export class GetStepCountQuery {
    constructor(
      public readonly userId: string,
      public readonly startDate?: Date,
      public readonly endDate?: Date,
      public readonly source?: string,
      public readonly page?: number,
      public readonly limit?: number,
    ) {}
  }
  