import { CURRENCY } from "./constants";
import { Currency, CurrencyRates } from "./types";

export function convertToRub(
  price: number,
  from: Currency,
  rates: CurrencyRates
): number {
  const result = price / rates[from];
  return toFixed(result);
}

export function convertRubToEur(rub: number, rates: CurrencyRates): number {
  const result = rub * rates[CURRENCY.EUR];
  return toFixed(result);
}

function toFixed(value: number) {
  return parseFloat(value.toFixed(2));
}
