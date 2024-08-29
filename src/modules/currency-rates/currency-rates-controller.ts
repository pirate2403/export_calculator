import { CurrencyRatesValues } from "./currency-rates-repos";
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
}
