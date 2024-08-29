export enum RecyclingFeeMessages {
  CALCULATED_FAILED = "Failed to calculate recycling fee",
}

export interface RecyclingRate {
  UNDER_3000: number;
  BETWEEN_3001_3500: number;
  OVER_3500: number;
}

export interface RecyclingBase {
  INDIVIDUAL: number;
  COMPANY: number;
}

export interface RecyclingFeeConfig {
  BASE: readonly [number, number];
  RATES: readonly RecyclingRate[];
}
