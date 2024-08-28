import { calculateCustomsDuty } from "./calculate-customs-duty";
import { calculateCustomsFee } from "./calculate-customs-fee";
import { calculateRecyclingFee } from "./calculate-recycling-fee";
import { COMPANY_COMMISSION } from "./constants";
import { CarAge, DutiesAndFees, Owner } from "./types";

interface Params {
  rubPrice: number;
  eurPrice: number;
  owner: Owner;
  carAge: CarAge;
  engineVolume: number;
}

export function calculateDutiesAndFees(params: Params): DutiesAndFees {
  const { rubPrice, eurPrice, owner, carAge, engineVolume } = params;
  const customsFee = calculateCustomsFee(rubPrice);
  const recyclingFee = calculateRecyclingFee(owner, carAge, engineVolume);
  const eurCustomsDuty = calculateCustomsDuty(eurPrice, carAge, engineVolume);

  return {
    customsFee,
    recyclingFee,
    eurCustomsDuty,
    companyCommission: COMPANY_COMMISSION,
  };
}
