import {CurrencyRatesValues} from "../services/currency-rates-service.ts";

export class Api {
    static async getRates(): Promise<CurrencyRatesValues> {
        const res = await fetch(`https://www.cbr-xml-daily.ru/latest.js`);
        const {rates} = await res.json();
        return rates;
    }
}
