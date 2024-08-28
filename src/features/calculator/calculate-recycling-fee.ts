import { RECYCLING_FEE_BASE, RECYCLING_FEE_RATES } from "./constants";
import { CarAge, Owner, RecyclingFeeRate } from "./types";

export function calculateRecyclingFee(
  owner: Owner,
  carAge: CarAge,
  engineVolume: number
): number {
  const rate = getRecyclingFeeRate(carAge, engineVolume);
  const base = RECYCLING_FEE_BASE[owner];
  return Math.floor(base * rate.ratio);
}

function getRecyclingFeeRate(
  carAge: CarAge,
  engineVolume: number
): RecyclingFeeRate {
  const rates = RECYCLING_FEE_RATES[carAge];

  if (engineVolume < 3001) {
    return rates["<3_001"];
  }
  if (engineVolume < 3501) {
    return rates["3_001-3_500"];
  }
  return rates[">3_500"];
}
