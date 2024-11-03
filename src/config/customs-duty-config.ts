const CUSTOMS_DUTY_UNDER_3_YEARS = {
    UNDER_8500: {
        minPerCm3: 2.5,
        percentage: 0.54,
    },
    BETWEEN_8500_16700: {
        minPerCm3: 3.5,
        percentage: 0.48,
    },
    BETWEEN_16700_42300: {
        minPerCm3: 5.5,
        percentage: 0.48,
    },
    BETWEEN_42300_84500: {
        minPerCm3: 7.5,
        percentage: 0.48,
    },
    BETWEEN_84500_169000: {
        minPerCm3: 15,
        percentage: 0.48,
    },
    OVER_169000: {
        minPerCm3: 20,
        percentage: 0.48,
    },
} as const;

const CUSTOMS_DUTY_3_5_YEARS = {
    UNDER_1000: {
        minPerCm3: 1.5,
        percentage: 0,
    },
    BETWEEN_1001_1500: {
        minPerCm3: 1.7,
        percentage: 0,
    },
    BETWEEN_1501_1800: {
        minPerCm3: 2.5,
        percentage: 0,
    },
    BETWEEN_1801_2300: {
        minPerCm3: 2.7,
        percentage: 0,
    },
    BETWEEN_2301_3000: {
        minPerCm3: 3,
        percentage: 0,
    },
    OVER_3001: {
        minPerCm3: 3.6,
        percentage: 0,
    },
} as const;

const CUSTOMS_DUTY_OVER_5_YEARS = {
    UNDER_1000: {
        minPerCm3: 3,
        percentage: 0,
    },
    BETWEEN_1001_1500: {
        minPerCm3: 3.2,
        percentage: 0,
    },
    BETWEEN_1501_1800: {
        minPerCm3: 3.5,
        percentage: 0,
    },
    BETWEEN_1801_2300: {
        minPerCm3: 4.8,
        percentage: 0,
    },
    BETWEEN_2301_3000: {
        minPerCm3: 5,
        percentage: 0,
    },
    OVER_3001: {
        minPerCm3: 5.7,
        percentage: 0,
    },
} as const;

const CUSTOMS_DUTY_ELECTRIC = 0.15 as const;

export const CUSTOMS_DUTY_CONFIG = {
    customsDutyUnder3Years: CUSTOMS_DUTY_UNDER_3_YEARS,
    customsDuty3To5Years: CUSTOMS_DUTY_3_5_YEARS,
    customsDutyOver5Years: CUSTOMS_DUTY_OVER_5_YEARS,
    customsDutyElectric: CUSTOMS_DUTY_ELECTRIC,
} as const;
