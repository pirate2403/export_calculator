import { CarAge, EngineType, Owner } from "../features/calculator";
import { Currency } from "../features/currency-rates";

export interface Car {
  owner: Owner;
  carAge: CarAge;
  engineType: EngineType;
  enginePower: number;
  engineVolume: number;
  price: number;
  currency: Currency;
}

export interface WillBeCalculatedCar extends Car {
  eurPrice: number;
  rubPrice: number;
}

export interface CalculatedCar extends WillBeCalculatedCar {
  customsFee: number;
  customsDuty: number;
  recyclingFee: number;
  companyCommission: number;
  totalPrice: number;
}
