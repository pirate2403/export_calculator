import { CAR_AGE, ENGINE_TYPE, OWNER } from "./constants";

export type EngineType = keyof typeof ENGINE_TYPE;
export type Owner = keyof typeof OWNER;
export type CarAge = keyof typeof CAR_AGE;

export type CustomDutyRate = {
  duty: string;
  minPerCm3: number;
  percentage: number;
};
export type RecyclingFeeRate = {
  duty: string;
  ratio: number;
};

export type DutiesAndFees = {
  eurCustomsDuty: number;
  customsFee: number;
  companyCommission: number;
  recyclingFee: number;
};
