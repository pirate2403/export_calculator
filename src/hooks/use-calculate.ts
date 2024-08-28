import { useState } from "react";
import { CalculatedCar, Car, WillBeCalculatedCar } from "../interfaces";
import {
  convertRubToEur,
  convertToRub,
  CURRENCY,
  CurrencyRates,
} from "../features/currency-rates";
import { calculateDutiesAndFees, DutiesAndFees } from "../features/calculator";

export function useCalculate() {
  const [calculatedCar, setCalculatedCar] = useState<CalculatedCar | null>(
    null
  );

  const calculateCar = (values: Car, currencyRates: CurrencyRates) => {
    const willBeCalculatedCar = prepareWillBeCalculatedCar(
      values,
      currencyRates
    );
    const dutiesAndFees = calculateDutiesAndFees(willBeCalculatedCar);
    const calculatedCar = prepareCalculatedCar(
      willBeCalculatedCar,
      dutiesAndFees,
      currencyRates
    );
    setCalculatedCar(calculatedCar);
  };

  const clear = () => {
    setCalculatedCar(null);
  };

  const prepareWillBeCalculatedCar = (
    car: Car,
    currencyRates: CurrencyRates
  ) => {
    const rubPrice = convertToRub(car.price, car.currency, currencyRates);
    const eurPrice = convertRubToEur(rubPrice, currencyRates);
    return { ...car, rubPrice, eurPrice };
  };

  const prepareCalculatedCar = (
    car: WillBeCalculatedCar,
    dutiesAndFees: DutiesAndFees,
    currencyRates: CurrencyRates
  ) => {
    const { companyCommission, customsFee, recyclingFee, eurCustomsDuty } =
      dutiesAndFees;
    const customsDuty = convertToRub(
      eurCustomsDuty,
      CURRENCY.EUR,
      currencyRates
    );
    const totalPrice: number =
      car.rubPrice +
      customsDuty +
      companyCommission +
      customsFee +
      recyclingFee;

    return {
      ...car,
      totalPrice,
      customsDuty,
      companyCommission,
      customsFee,
      recyclingFee,
    };
  };

  return {
    calculatedCar,
    calculateCar,
    clear,
  };
}
