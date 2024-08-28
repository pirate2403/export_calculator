import { CURRENCY } from "./constants";

export type Currency = keyof typeof CURRENCY;
export type CurrencyRates = Record<Currency, number>;
