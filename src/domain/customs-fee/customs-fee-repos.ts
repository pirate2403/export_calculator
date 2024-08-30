export enum CustomsFeeMessages {
  CALCULATED_FAILED = "Failed to calculate customs fee",
}

export interface CustomsFeeConfig {
  UNDER_200K: number;
  UNDER_450K: number;
  UNDER_1_2M: number;
  UNDER_2_7M: number;
  UNDER_4_2M: number;
  UNDER_5_5M: number;
  UNDER_7M: number;
  UNDER_8M: number;
  UNDER_9M: number;
  UNDER_10M: number;
  OVER_10M: number;
}
