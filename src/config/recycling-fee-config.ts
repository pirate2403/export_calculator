const RECYCLING_RATE_UNDER_3_YEARS = {
  UNDER_3000: 0.17,
  BETWEEN_3001_3500: 48.5,
  OVER_3500: 61.67,
} as const;

const RECYCLING_RATE_OVER_3_YEARS = {
  UNDER_3000: 0.26,
  BETWEEN_3001_3500: 74.25,
  OVER_3500: 81.19,
} as const;

export const RECYCLING_FEE_CONFIG = {
  BASE: [20_000, 150_000],
  RATES: [
    RECYCLING_RATE_UNDER_3_YEARS,
    RECYCLING_RATE_OVER_3_YEARS,
    RECYCLING_RATE_OVER_3_YEARS,
  ],
} as const;
