export interface CurrencyRatesValues {
    USD: number;
    EUR: number;
    JPY: number;
    CNY: number;
    KRW: number;
}

export class CurrencyRatesService {
    async updateRates(): Promise<CurrencyRatesValues> {
        const res = await fetch(`https://www.cbr-xml-daily.ru/latest.js`);
        const {rates} = await res.json();
        return rates;
    }

    convertToRub(price: number, rate: number): number {
        return this._toFixed(price * rate);
    }

    convertFromRub(rub: number, rate: number): number {
        return this._toFixed(rub / rate);
    }

    private _toFixed(value: number): number {
        return parseFloat(value.toFixed(2));
    }
}
