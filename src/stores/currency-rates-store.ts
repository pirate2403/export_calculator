import { useEffect } from "react";
import { create } from "zustand";
import {
  CurrencyRatesController,
  CurrencyRatesMessages,
  CurrencyRatesValues,
} from "../modules/currency-rates";
import {} from "../modules/currency-rates/currency-rates-repos";

interface Store {
  isLoading: boolean;
  errorMessage: string | null;
  currencyRates: CurrencyRatesValues;
  updateRates: () => Promise<void>;
}

const INITIAL_RATES: CurrencyRatesValues = {
  USD: 1,
  EUR: 1,
  JPY: 1,
  CNY: 1,
  KRW: 1,
};

const controller = new CurrencyRatesController(INITIAL_RATES);

const useStore = create<Store>((set) => ({
  isLoading: false,
  errorMessage: null,
  currencyRates: controller.currencyRates,
  updateRates: async () => {
    try {
      set({ isLoading: true, errorMessage: null });
      await controller.updateRates();
      set({ currencyRates: controller.currencyRates, isLoading: false });
    } catch {
      set({
        errorMessage: CurrencyRatesMessages.UPDATE_FAILED,
        isLoading: false,
      });
    }
  },
}));

export const useCurrencyRatesStore = () => {
  const store = useStore();

  useEffect(() => {
    store.updateRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
};
