import { CurrencyRatesValues } from "./currency-rates-repos";

export class CurrencyRateApi {
  static async getCurrencyRates(): Promise<CurrencyRatesValues> {
    const res = await fetch(`https://www.cbr-xml-daily.ru/latest.js`);
    const { rates } = await res.json();
    return rates;
  }
}
