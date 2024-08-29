export const ENGINE_TYPE = {
  GASOLINE: "GASOLINE",
  DIESEL: "DIESEL",
  ELECTRIC: "ELECTRIC",
  HYBRID: "HYBRID",
} as const;

export const OWNER = {
  INDIVIDUAL: "INDIVIDUAL",
  COMPANY: "COMPANY",
} as const;

export const CAR_AGE = {
  "<3": "<3",
  "3-5": "3-5",
  ">5": ">5",
} as const;

export const ENGINE_POWER_TYPE = {
  HORSE: "HORSE",
  KILO: "KILO",
} as const;

export const COMPANY_COMMISSION = 50_000;

export const CUSTOMS_FEE = {
  "<200_000": 775,
  "<450_000": 1_550,
  "<1_200_000": 3_100,
  "<2_700_000": 8_530,
  "<4_200_000": 12_000,
  "<5_500_000": 15_500,
  "<7_000_000": 20_000,
  "<8_000_000": 23_000,
  "<9_000_000": 25_000,
  "<10_000_000": 27_000,
  ">10_000_000": 30_000,
} as const;

export const UNDER_TREE_YEARS_RECYCLING_FEE_RATES = {
  "<3_001": {
    duty: "до 3000 см³",
    ratio: 0.17,
  },
  "3_001-3_500": {
    duty: "3001 - 3500 см³",
    ratio: 48.5,
  },
  ">3_500": {
    duty: "свыше 3500 см³",
    ratio: 61.67,
  },
};

export const ABOVE_TREE_YEARS_RECYCLING_FEE_RATES = {
  "<3_001": {
    duty: "до 3000 см³",
    ratio: 0.26,
  },
  "3_001-3_500": {
    duty: "3001 - 3500 см³",
    ratio: 74.25,
  },
  ">3_500": {
    duty: "свыше 3500 см³",
    ratio: 81.19,
  },
};

export const RECYCLING_FEE_BASE = {
  [OWNER.INDIVIDUAL]: 20_000,
  [OWNER.COMPANY]: 150_000,
};

export const RECYCLING_FEE_RATES = {
  [CAR_AGE["<3"]]: UNDER_TREE_YEARS_RECYCLING_FEE_RATES,
  [CAR_AGE["3-5"]]: ABOVE_TREE_YEARS_RECYCLING_FEE_RATES,
  [CAR_AGE[">5"]]: ABOVE_TREE_YEARS_RECYCLING_FEE_RATES,
};

export const UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES = {
  "<8_500": {
    duty: "54%, но не меньше 2.5 евро/см³",
    minPerCm3: 2.5,
    percentage: 0.54,
  },
  "8_500-16_700": {
    duty: "48%, но не менее 3.5 евро/см³",
    minPerCm3: 3.5,
    percentage: 0.48,
  },
  "16_700-42_300": {
    duty: "48%, но не менее 5.5 евро/см³",
    minPerCm3: 5.5,
    percentage: 0.48,
  },
  "42_300-84_500": {
    duty: "48%, но не менее 7.5 евро/см³",
    minPerCm3: 7.5,
    percentage: 0.48,
  },
  "84_500-169_000": {
    duty: "48%, но не менее 15 евро/см³",
    minPerCm3: 15,
    percentage: 0.48,
  },
  ">169_000": {
    duty: "48%, но не менее 20 евро/см³",
    minPerCm3: 20,
    percentage: 0.48,
  },
} as const;

export const BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES = {
  "<1_001": {
    duty: "меньше 1000 см3",
    minPerCm3: 1.5,
    percentage: 0,
  },
  "1_001-1_501": {
    duty: "1001 - 1500 см3",
    minPerCm3: 1.7,
    percentage: 0,
  },
  "1_501-1_801": {
    duty: "1501 - 1800 см3",
    minPerCm3: 2.5,
    percentage: 0,
  },
  "1_801-2_301": {
    duty: "1801 - 2300 см3",
    minPerCm3: 2.7,
    percentage: 0,
  },
  "2_301-3_001": {
    duty: "2301 - 3000 см3",
    minPerCm3: 3,
    percentage: 0,
  },
  ">3_001": {
    duty: "больше 3001 см3",
    minPerCm3: 3.6,
    percentage: 0,
  },
} as const;

export const ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES = {
  "<1_001": {
    duty: "меньше 1000 см3",
    minPerCm3: 3,
    percentage: 0,
  },
  "1_001-1_501": {
    duty: "1001 - 1500 см3",
    minPerCm3: 3.2,
    percentage: 0,
  },
  "1_501-1_801": {
    duty: "1501 - 1800 см3",
    minPerCm3: 3.5,
    percentage: 0,
  },
  "1_801-2_301": {
    duty: "1801 - 2300 см3",
    minPerCm3: 4.8,
    percentage: 0,
  },
  "2_301-3_001": {
    duty: "2301 - 3000 см3",
    minPerCm3: 5,
    percentage: 0,
  },
  ">3_001": {
    duty: "больше 3001 см3",
    minPerCm3: 5.7,
    percentage: 0,
  },
} as const;

// export const ENGINE = {
//   GAS: "GASOLINE",
//   DIESEL: "DIESEL",
//   ELECTRIC: "ELECTRIC",
//   HYBRID: "HYBRID",
// } as const;

// export const OWNER_TYPE = {
//   INDIVIDUAL: "INDIVIDUAL",
//   COMPANY: "COMPANY",
// } as const;

// export const CAR_AGE_GROUP = {
//   UNDER_3: "<3",
//   BETWEEN_3_5: "3-5",
//   OVER_5: ">5",
// } as const;

// export const POWER_UNIT = {
//   HP: "HORSE",
//   KW: "KILO",
// } as const;

// export const COMMISSION = 50_000;

// export const CUSTOMS = {
//   UNDER_200K: 775,
//   UNDER_450K: 1_550,
//   UNDER_1_2M: 3_100,
//   UNDER_2_7M: 8_530,
//   UNDER_4_2M: 12_000,
//   UNDER_5_5M: 15_500,
//   UNDER_7M: 20_000,
//   UNDER_8M: 23_000,
//   UNDER_9M: 25_000,
//   UNDER_10M: 27_000,
//   OVER_10M: 30_000,
// } as const;

// export const RECYCLING_RATE_UNDER_3_YEARS = {
//   UNDER_3000: {
//     duty: "до 3000 см³",
//     ratio: 0.17,
//   },
//   BETWEEN_3001_3500: {
//     duty: "3001 - 3500 см³",
//     ratio: 48.5,
//   },
//   OVER_3500: {
//     duty: "свыше 3500 см³",
//     ratio: 61.67,
//   },
// };

// export const RECYCLING_RATE_OVER_3_YEARS = {
//   UNDER_3000: {
//     duty: "до 3000 см³",
//     ratio: 0.26,
//   },
//   BETWEEN_3001_3500: {
//     duty: "3001 - 3500 см³",
//     ratio: 74.25,
//   },
//   OVER_3500: {
//     duty: "свыше 3500 см³",
//     ratio: 81.19,
//   },
// };

// export const RECYCLING_BASE = {
//   INDIVIDUAL: 20_000,
//   COMPANY: 150_000,
// };

// export const RECYCLING_RATES = {
//   [CAR_AGE_GROUP.UNDER_3]: RECYCLING_RATE_UNDER_3_YEARS,
//   [CAR_AGE_GROUP.BETWEEN_3_5]: RECYCLING_RATE_OVER_3_YEARS,
//   [CAR_AGE_GROUP.OVER_5]: RECYCLING_RATE_OVER_3_YEARS,
// };

// export const CUSTOMS_DUTY_UNDER_3_YEARS = {
//   UNDER_8500: {
//     duty: "54%, но не меньше 2.5 евро/см³",
//     minPerCm3: 2.5,
//     percentage: 0.54,
//   },
//   BETWEEN_8500_16700: {
//     duty: "48%, но не менее 3.5 евро/см³",
//     minPerCm3: 3.5,
//     percentage: 0.48,
//   },
//   BETWEEN_16700_42300: {
//     duty: "48%, но не менее 5.5 евро/см³",
//     minPerCm3: 5.5,
//     percentage: 0.48,
//   },
//   BETWEEN_42300_84500: {
//     duty: "48%, но не менее 7.5 евро/см³",
//     minPerCm3: 7.5,
//     percentage: 0.48,
//   },
//   BETWEEN_84500_169000: {
//     duty: "48%, но не менее 15 евро/см³",
//     minPerCm3: 15,
//     percentage: 0.48,
//   },
//   OVER_169000: {
//     duty: "48%, но не менее 20 евро/см³",
//     minPerCm3: 20,
//     percentage: 0.48,
//   },
// } as const;

// export const CUSTOMS_DUTY_3_5_YEARS = {
//   UNDER_1000: {
//     duty: "меньше 1000 см3",
//     minPerCm3: 1.5,
//     percentage: 0,
//   },
//   BETWEEN_1001_1500: {
//     duty: "1001 - 1500 см3",
//     minPerCm3: 1.7,
//     percentage: 0,
//   },
//   BETWEEN_1501_1800: {
//     duty: "1501 - 1800 см3",
//     minPerCm3: 2.5,
//     percentage: 0,
//   },
//   BETWEEN_1801_2300: {
//     duty: "1801 - 2300 см3",
//     minPerCm3: 2.7,
//     percentage: 0,
//   },
//   BETWEEN_2301_3000: {
//     duty: "2301 - 3000 см3",
//     minPerCm3: 3,
//     percentage: 0,
//   },
//   OVER_3001: {
//     duty: "больше 3001 см3",
//     minPerCm3: 3.6,
//     percentage: 0,
//   },
// } as const;

// export const CUSTOMS_DUTY_OVER_5_YEARS = {
//   UNDER_1000: {
//     duty: "меньше 1000 см3",
//     minPerCm3: 3,
//     percentage: 0,
//   },
//   BETWEEN_1001_1500: {
//     duty: "1001 - 1500 см3",
//     minPerCm3: 3.2,
//     percentage: 0,
//   },
//   BETWEEN_1501_1800: {
//     duty: "1501 - 1800 см3",
//     minPerCm3: 3.5,
//     percentage: 0,
//   },
//   BETWEEN_1801_2300: {
//     duty: "1801 - 2300 см3",
//     minPerCm3: 4.8,
//     percentage: 0,
//   },
//   BETWEEN_2301_3000: {
//     duty: "2301 - 3000 см3",
//     minPerCm3: 5,
//     percentage: 0,
//   },
//   OVER_3001: {
//     duty: "больше 3001 см3",
//     minPerCm3: 5.7,
//     percentage: 0,
//   },
// } as const;
