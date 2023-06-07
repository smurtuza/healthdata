import { Model } from "mongoose";

// src/step-count/queries/get-step-count.query.ts
export class GetAppleHealthQtQuery {
    constructor(
      public readonly appleHealthQtModel:Model<any>,
      public readonly userId: string,
      public readonly page?: number,
      public readonly limit?: number,
      public readonly startDate?: Date,
      public readonly endDate?: Date,
      public readonly source?: string,
     
    ) {}
  }
  
export class GetLatestAppleHealthQtQuery {
  constructor(
    public readonly appleHealthQtModel:Model<any>,
    public readonly userId: string,
  ) {}
}