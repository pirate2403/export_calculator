export const CAR_AGE_GROUP = {
  UNDER_3: 0,
  BETWEEN_3_5: 1,
  OVER_5: 2,
} as const;

export const OWNER_TYPE = {
  INDIVIDUAL: 0,
  COMPANY: 1,
} as const;

export const ENGINE_TYPE = {
  GAS: 0,
  DIESEL: 1,
  ELECTRIC: 2,
  HYBRID: 3,
} as const;

export const CURRENCY_RATES = {
  USD: "USD",
  EUR: "EUR",
  JPY: "JPY",
  CNY: "CNY",
  KRW: "KRW",
} as const;

export const ERROR = {
  calc: "Произошла ошибка при расчёте. Пожалуйста, обратитесь к системному администратору.",
  fetch:
    "Произошла ошибка при получении данных. Пожалуйста, обратитесь к системному администратору.",
} as const;
