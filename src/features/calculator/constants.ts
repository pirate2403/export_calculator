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
