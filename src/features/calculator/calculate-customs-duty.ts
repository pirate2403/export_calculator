import {
  ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES,
  BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES,
  CAR_AGE,
  UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES,
} from "./constants";
import { CarAge, CustomDutyRate } from "./types";

const CALCULATOR = {
  [CAR_AGE["<3"]]: calcUnderThreeYears,
  [CAR_AGE["3-5"]]: calcBetweenThreeAndFiveYears,
  [CAR_AGE[">5"]]: calcAboveFiveYears,
} as const;
export function calculateCustomsDuty(
  eurPrice: number,
  carAge: CarAge,
  engineVolume: number
): number {
  const calc = CALCULATOR[carAge];
  return calc(engineVolume, eurPrice);
}

function calcUnderThreeYears(engineVolume: number, eurPrice: number): number {
  const rate = getUnderThreeYearsCustomsDutyRate(eurPrice);
  const percentagePrice = eurPrice * rate.percentage;
  const minPerCm3Price = rate.minPerCm3 * engineVolume;
  return Math.max(percentagePrice, minPerCm3Price);
}

function getUnderThreeYearsCustomsDutyRate(price: number): CustomDutyRate {
  if (price <= 8500) {
    return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES["<8_500"];
  }
  if (price <= 16700) {
    return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES["8_500-16_700"];
  }
  if (price <= 42300) {
    return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES["16_700-42_300"];
  }
  if (price <= 84500) {
    return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES["42_300-84_500"];
  }
  if (price <= 169000) {
    return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES["84_500-169_000"];
  }
  return UNDER_TREE_YEARS_CUSTOMS_DUTY_RATES[">169_000"];
}

function calcBetweenThreeAndFiveYears(engineVolume: number): number {
  const rate = getBetweenThreeAndFiveYearsCustomsDutyRate(engineVolume);
  return rate.minPerCm3 * engineVolume;
}

function getBetweenThreeAndFiveYearsCustomsDutyRate(
  engineVolume: number
): CustomDutyRate {
  if (engineVolume < 1001) {
    return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES["<1_001"];
  }
  if (engineVolume < 1501) {
    return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_001-1_501"];
  }
  if (engineVolume < 1801) {
    return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_501-1_801"];
  }
  if (engineVolume < 2301) {
    return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_801-2_301"];
  }
  if (engineVolume < 3001) {
    return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES["2_301-3_001"];
  }
  return BETWEEN_TREE_AND_FIVE_YEARS_CUSTOMS_DUTY_RATES[">3_001"];
}

function calcAboveFiveYears(engineVolume: number): number {
  const rate = getAboveFiveYearsCustomsDutyRate(engineVolume);
  return rate.minPerCm3 * engineVolume;
}

function getAboveFiveYearsCustomsDutyRate(
  engineVolume: number
): CustomDutyRate {
  if (engineVolume < 1001) {
    return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES["<1_001"];
  }
  if (engineVolume < 1501) {
    return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_001-1_501"];
  }
  if (engineVolume < 1801) {
    return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_501-1_801"];
  }
  if (engineVolume < 2301) {
    return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES["1_801-2_301"];
  }
  if (engineVolume < 3001) {
    return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES["2_301-3_001"];
  }
  return ABOVE_FIVE_YEARS_CUSTOMS_DUTY_RATES[">3_001"];
}
