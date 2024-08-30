import { CurrencyRatesValues, CurrencyRates } from "./currency-rates-repos";
import { CurrencyRateApi } from "./currency-rates-api";
import { CurrencyRatesModel } from "./currency-rates-model";

export class CurrencyRatesController {
  private _model: CurrencyRatesModel;

  constructor(initialRates: CurrencyRatesValues) {
    this._model = new CurrencyRatesModel(initialRates);
  }

  get currencyRates(): CurrencyRatesValues {
    return this._model.rates;
  }

  async updateRates(): Promise<void> {
    const rates = await CurrencyRateApi.getCurrencyRates();
    this._model.rates = rates;
  }

  convertToRub(price: number, from: CurrencyRates): number {
    return this._toFixed(price / this.currencyRates[from]);
  }

  convertEurToRub(price: number): number {
    return this._toFixed(price / this.currencyRates.EUR);
  }

  convertRubToEur(rub: number): number {
    return this._toFixed(rub * this.currencyRates.EUR);
  }

  private _toFixed(value: number) {
    return parseFloat(value.toFixed(2));
  }
}
