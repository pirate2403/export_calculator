import { create } from "zustand";
import { COMPANY_CONFIG } from "../config/company-config";
import { CURRENCY_RATES_CONFIG } from "../config/currency-rates-config";
import { CUSTOMS_CLARENCE_CONFIG } from "../config/customs-clearance-config";
import { CUSTOMS_DUTY_CONFIG } from "../config/customs-duty-config";
import { CUSTOMS_FEE_CONFIG } from "../config/customs-fee-config";
import { JAPAN_EXPENSES_CONFIG } from "../config/japan-expanses-config";
import { RECYCLING_FEE_CONFIG } from "../config/recycling-fee-config";
import { ERROR } from "../constants";
import {
  CurrencyRatesController,
  CurrencyRatesValues,
} from "../domain/currency-rates";
import { CustomsDutyController } from "../domain/customs-duty";
import { CustomsFeeController } from "../domain/customs-fee";
import { RecyclingFeeController } from "../domain/recycling-fee";
import { Car } from "../interfaces";

interface Store {
  isLoading: boolean;
  errorMessage: null | string;
  currencyRates: CurrencyRatesValues;
  price: number;
  customsDuty: number;
  customsFee: number;
  recyclingFee: number;
  companyCommission: number;
  brokerExpenses: number;
  expertise: number;
  testing: number;
  portDelivery: number;
  freight: number;
}

interface CalculateRecyclingFeeProps {
  ownerType: number;
  carAgeGroup: number;
  engineVolume: number;
}

interface CalculateCustomsDutyProps {
  carAgeGroup: number;
  engineVolume: number;
  eurPrice: number;
}

const INITIAL_STATE = {
  isLoading: false,
  errorMessage: null,
  currencyRates: CURRENCY_RATES_CONFIG.INITIAL_RATES,
  price: 0,
  customsDuty: 0,
  customsFee: 0,
  recyclingFee: 0,
  companyCommission: COMPANY_CONFIG.COMMISSION,
  brokerExpenses: CUSTOMS_CLARENCE_CONFIG.BROKER_EXPANSES,
  expertise: CUSTOMS_CLARENCE_CONFIG.EXPERTISE,
  testing: CUSTOMS_CLARENCE_CONFIG.TESTING,
  portDelivery: 0,
  freight: 0,
} satisfies Store;

class RootStore {
  private _store = create<Store>(() => INITIAL_STATE);
  private _currencyRates = new CurrencyRatesController(CURRENCY_RATES_CONFIG);
  private _customsDuty = new CustomsDutyController(CUSTOMS_DUTY_CONFIG);
  private _customsFee = new CustomsFeeController(CUSTOMS_FEE_CONFIG);
  private _recyclingFee = new RecyclingFeeController(RECYCLING_FEE_CONFIG);

  get state() {
    return this._store();
  }

  async calculate(car: Car) {
    await this.fetchCurrencyRates();
    this._calculateTotalPrice(car);
  }

  async fetchCurrencyRates() {
    try {
      this._store.setState({ isLoading: true });
      await this._currencyRates.updateRates();
      const currencyRates = this._currencyRates.currencyRates;
      this._store.setState({ currencyRates, isLoading: false });
    } catch {
      this._store.setState({ isLoading: false, errorMessage: ERROR.fetch });
    }
  }

  reset() {
    const currencyRates = this._currencyRates.currencyRates;
    this._customsDuty.reset();
    this._customsFee.reset();
    this._recyclingFee.reset();
    this._store.setState({ ...INITIAL_STATE, currencyRates });
  }

  private _calculateTotalPrice(car: Car) {
    try {
      const { currency, price } = car;
      const rubPrice = this._currencyRates.convertToRub(price, currency);
      const eurPrice = this._currencyRates.convertRubToEur(rubPrice);
      const eurCustomsDuty = this._calculateCustomsDuty({ ...car, eurPrice });
      this._store.setState({
        price: rubPrice,
        customsFee: this._calculateCustomsFee(rubPrice),
        recyclingFee: this._calculateRecyclingFee({ ...car }),
        customsDuty: this._currencyRates.convertEurToRub(eurCustomsDuty),
        portDelivery: this._currencyRates.convertJpyToRub(
          JAPAN_EXPENSES_CONFIG.PORT_DELIVERY
        ),
        freight: this._currencyRates.convertJpyToRub(
          JAPAN_EXPENSES_CONFIG.FREIGHT
        ),
      });
    } catch {
      this._store.setState({ errorMessage: ERROR.calc });
    }
  }

  private _calculateRecyclingFee(props: CalculateRecyclingFeeProps) {
    const { ownerType, carAgeGroup, engineVolume } = props;
    this._recyclingFee.calculate(ownerType, carAgeGroup, engineVolume);
    return this._recyclingFee.recyclingFee;
  }

  private _calculateCustomsFee(rubPrice: number) {
    this._customsFee.calculate(rubPrice);
    return this._customsFee.customsFee;
  }

  private _calculateCustomsDuty(props: CalculateCustomsDutyProps) {
    const { carAgeGroup, engineVolume, eurPrice } = props;
    this._customsDuty.calculate(carAgeGroup, engineVolume, eurPrice);
    return this._customsDuty.customsDuty;
  }
}

export const rootStore = new RootStore();
