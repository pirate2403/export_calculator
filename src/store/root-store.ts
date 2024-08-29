import { Modal, ModalFuncProps } from "antd";
import { ModalFunc } from "antd/es/modal/confirm";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { COMPANY_CONFIG } from "../config/company-config";
import { CURRENCY_RATES_CONFIG } from "../config/currency-rates-config";
import { CUSTOMS_DUTY_CONFIG } from "../config/customs-duty-config";
import { CUSTOMS_FEE_CONFIG } from "../config/customs-fee-config";
import { RECYCLING_FEE_CONFIG } from "../config/recycling-fee-config";
import { ERROR } from "../constants";
import { Car } from "../interfaces";
import {
  CurrencyRatesController,
  CurrencyRatesValues,
} from "../modules/currency-rates";
import { CustomsDutyController } from "../modules/customs-duty";
import { CustomsFeeController } from "../modules/customs-fee";
import { RecyclingFeeController } from "../modules/recycling-fee";

interface Store {
  isLoading: boolean;
  currencyRates: CurrencyRatesValues;
  price: number;
  customsDuty: number;
  customsFee: number;
  recyclingFee: number;
  companyCommission: number;
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

const INITIAL_STATE: Store = {
  isLoading: false,
  currencyRates: CURRENCY_RATES_CONFIG,
  price: 0,
  customsDuty: 0,
  customsFee: 0,
  recyclingFee: 0,
  companyCommission: COMPANY_CONFIG.COMMISSION,
};

class RootStore {
  private _store = create<Store>(() => INITIAL_STATE);
  private _currencyRates = new CurrencyRatesController(CURRENCY_RATES_CONFIG);
  private _customsDuty = new CustomsDutyController(CUSTOMS_DUTY_CONFIG);
  private _customsFee = new CustomsFeeController(CUSTOMS_FEE_CONFIG);
  private _recyclingFee = new RecyclingFeeController(RECYCLING_FEE_CONFIG);

  constructor(
    private _showModal: (props: ModalFuncProps) => ReturnType<ModalFunc>
  ) {}

  get state() {
    return this._store();
  }

  calculate(car: Car) {
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
      });
    } catch {
      this._handleError(ERROR.calc);
    }
  }

  async fetchCurrencyRates() {
    try {
      this._store.setState({ isLoading: true });
      await this._currencyRates.updateRates();
      const currencyRates = this._currencyRates.currencyRates;
      this._store.setState({ currencyRates, isLoading: false });
    } catch {
      this._handleError(ERROR.fetch);
      this._store.setState({ isLoading: false });
    }
  }

  reset() {
    const currencyRates = this._currencyRates.currencyRates;
    this._customsDuty.reset();
    this._customsFee.reset();
    this._recyclingFee.reset();
    this._store.setState({ ...INITIAL_STATE, currencyRates });
  }

  private _handleError(message: string) {
    this._showModal({
      title: ERROR.title,
      content: message,
      onOk: this.reset.bind(this),
    });
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

export const useRootStore = () => {
  const [modal, modalContextHolder] = Modal.useModal();
  const [store] = useState(() => new RootStore(modal.error));

  useEffect(() => {
    store.fetchCurrencyRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state: store.state,
    calculate: store.calculate.bind(store),
    reset: store.reset.bind(store),
    modal: modalContextHolder,
  };
};
