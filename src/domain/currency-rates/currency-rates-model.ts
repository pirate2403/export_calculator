import { CurrencyRatesValues } from "./currency-rates-repos";

export class CurrencyRatesModel {
  constructor(private _rates: CurrencyRatesValues) {}

  get rates(): CurrencyRatesValues {
    return this._rates;
  }

  set rates(value: CurrencyRatesValues) {
    Object.assign(this._rates, value);
  }
}
