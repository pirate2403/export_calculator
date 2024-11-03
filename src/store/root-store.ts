import {create} from "zustand";
import {JAPAN_EXPENSES_CONFIG} from "./../config/japan-expanses-config";
import {COMPANY_CONFIG} from "../config/company-config";
import {CURRENCY_RATES_CONFIG} from "../config/currency-rates-config";
import {CUSTOMS_CLARENCE_CONFIG} from "../config/customs-clearance-config";
import {CUSTOMS_DUTY_CONFIG} from "../config/customs-duty-config";
import {CUSTOMS_FEE_CONFIG} from "../config/customs-fee-config";
import {RECYCLING_FEE_CONFIG} from "../config/recycling-fee-config";
import {ERROR} from "../constants";
import {Car} from "../interfaces";
import {CurrencyRatesService, CurrencyRatesValues} from "../services/currency-rates-service.ts";
import {CustomsDutyService} from "../services/customs-duty.service.ts";
import {CustomsFeeService} from "../services/customs-fee-service.ts";
import {RecyclingFeeService} from "../services/recycling-fee-service.ts";
import {JapanExpansesService} from "../services/japan-expanses-service.ts";
import {ExciseDutyService} from "../services/excise-duty-service.ts";
import {EXCISE_DUTY_CONFIG} from "../config/excise-duty-config.ts";
import {VatService} from "../services/vat-service.ts";

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
    japanExpanses: number;
    exciseDuty: number;
    vat: number;
}

const INITIAL_STATE = {
    isLoading: false,
    errorMessage: null,
    currencyRates: CURRENCY_RATES_CONFIG.INITIAL_RATES,
    price: 0,
    customsDuty: 0,
    customsFee: 0,
    recyclingFee: 0,
    companyCommission: 0,
    brokerExpenses: 0,
    japanExpanses: 0,
    exciseDuty: 0,
    vat: 0
} satisfies Store;

class RootStore {
    private _store = create<Store>(() => INITIAL_STATE);
    private _currencyRates = new CurrencyRatesService();
    private _customsDuty = new CustomsDutyService(CUSTOMS_DUTY_CONFIG);
    private _customsFee = new CustomsFeeService(CUSTOMS_FEE_CONFIG);
    private _recyclingFee = new RecyclingFeeService(RECYCLING_FEE_CONFIG);
    private _japanExpanses = new JapanExpansesService(JAPAN_EXPENSES_CONFIG);
    private _exciseDuty = new ExciseDutyService(EXCISE_DUTY_CONFIG);
    private _vat = new VatService();

    get state() {
        return this._store();
    }

    async calculate(car: Car) {
        this._calculateTotalPrice(car);
    }

    async fetchCurrencyRates() {
        try {
            this._store.setState({isLoading: true});
            const currencyRates = await this._currencyRates.updateRates();
            this._store.setState({currencyRates, isLoading: false});
        } catch {
            this._store.setState({isLoading: false, errorMessage: ERROR.fetch});
        }
    }

    reset() {
        const currencyRates = this._store.getState().currencyRates;
        this._store.setState({...INITIAL_STATE, currencyRates});
    }

    private _calculateTotalPrice(car: Car) {
        try {
            const currencyRates = this._store.getState().currencyRates;
            const rubPrice = this._currencyRates.convertToRub(car.price, currencyRates[car.currency]);
            const eurPrice = this._currencyRates.convertFromRub(rubPrice, currencyRates.EUR);
            const customsDuty = this._currencyRates.convertToRub(this._customsDuty.calculate(car, eurPrice), currencyRates.EUR);
            const customsFee = this._customsFee.calculate(rubPrice);
            const recyclingFee = this._recyclingFee.calculate(car);
            const japanExpanses = this._currencyRates.convertToRub(this._japanExpanses.calculate(car), currencyRates[car.currency]);
            const exciseDuty = this._exciseDuty.calculate(car);
            const vat = this._vat.calculate(car, rubPrice, customsDuty, exciseDuty);

            this._store.setState({
                customsDuty,
                customsFee,
                recyclingFee,
                price: rubPrice,
                japanExpanses,
                exciseDuty,
                vat,
                companyCommission: COMPANY_CONFIG.COMMISSION,
                brokerExpenses: CUSTOMS_CLARENCE_CONFIG.BROKER_EXPANSES,
            });
        } catch {
            this._store.setState({errorMessage: ERROR.calc});
        }
    }
}

export const rootStore = new RootStore();
