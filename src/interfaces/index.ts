import { CurrencyRates } from "../modules/currency-rates";

export interface Car {
  ownerType: number;
  carAgeGroup: number;
  engineType: number;
  enginePower: number;
  engineVolume: number;
  price: number;
  currency: CurrencyRates;
}
