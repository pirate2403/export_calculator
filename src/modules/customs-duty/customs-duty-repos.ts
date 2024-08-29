export enum CarAgeGroup {
  UNDER_3 = "UNDER_3",
  BETWEEN_3_5 = "BETWEEN_3_5",
  OVER_5 = "OVER_5",
}

export interface CustomsDutyConfig {
  customsDutyUnder3Years: CustomsDutyUnder3Years;
  customsDuty3To5Years: CustomsDuty3To5Years;
  customsDutyOver5Years: CustomsDutyOver5Years;
}

export type CustomsDutyRate = {
  minPerCm3: number;
  percentage: number;
};

export type CustomsDutyUnder3Years = {
  UNDER_8500: CustomsDutyRate;
  BETWEEN_8500_16700: CustomsDutyRate;
  BETWEEN_16700_42300: CustomsDutyRate;
  BETWEEN_42300_84500: CustomsDutyRate;
  BETWEEN_84500_169000: CustomsDutyRate;
  OVER_169000: CustomsDutyRate;
};

export type CustomsDuty3To5Years = {
  UNDER_1000: CustomsDutyRate;
  BETWEEN_1001_1500: CustomsDutyRate;
  BETWEEN_1501_1800: CustomsDutyRate;
  BETWEEN_1801_2300: CustomsDutyRate;
  BETWEEN_2301_3000: CustomsDutyRate;
  OVER_3001: CustomsDutyRate;
};

export type CustomsDutyOver5Years = {
  UNDER_1000: CustomsDutyRate;
  BETWEEN_1001_1500: CustomsDutyRate;
  BETWEEN_1501_1800: CustomsDutyRate;
  BETWEEN_1801_2300: CustomsDutyRate;
  BETWEEN_2301_3000: CustomsDutyRate;
  OVER_3001: CustomsDutyRate;
};
