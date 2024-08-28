import { CurrencyRates } from "./types";

export async function getCurrencyRates(): Promise<CurrencyRates> {
  const res = await fetch("https://www.cbr-xml-daily.ru/latest.js");
  const { rates } = await res.json();
  return { RUB: 1, ...rates };
}
