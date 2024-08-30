export enum CurrencyRatesMessages {
  UPDATE_FAILED = "Failed to update currency rates",
}

export enum CurrencyRates {
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  CNY = "CNY",
  KRW = "KRW",
}

export interface CurrencyRatesValues {
  USD: number;
  EUR: number;
  JPY: number;
  CNY: number;
  KRW: number;
}
