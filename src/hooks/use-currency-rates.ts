import { useEffect, useState } from "react";
import { CurrencyRates, getCurrencyRates } from "../features/currency-rates";
import { message } from "antd";

const DEFAULT: CurrencyRates = {
  RUB: 1,
  USD: 1,
  EUR: 1,
  JPY: 1,
  CNY: 1,
  KRW: 1,
};

export function useCurrencyRates() {
  const [currencyRates, setCurrencyRates] = useState(DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi] = message.useMessage();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const rates = await getCurrencyRates();
      setCurrencyRates(rates);
    } catch {
      messageApi.open({
        type: "error",
        content: "Ошибка при получении курса валют",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { currencyRates, isLoading };
}
