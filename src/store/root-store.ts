import {create} from "zustand";
import {Api} from "../api";
import {getValueByClass} from "../helpers/getValueByClass.ts";
import {convert} from "../helpers/convert.ts";
import {CONFIG} from "../config/config.ts";

interface CurrencyRates {
    USD: number;
    EUR: number;
    JPY: number;
    CNY: number;
    KRW: number;
}

interface Store {
    isLoading: boolean;
    isCalculatorInit: boolean;
    errorMessage: null | string;
    currencyRates: CurrencyRates;
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

const INITIAL_RATES = {
    USD: 1,
    EUR: 1,
    JPY: 1,
    CNY: 1,
    KRW: 1,
} satisfies CurrencyRates

const INITIAL_STATE = {
    isLoading: false,
    isCalculatorInit: false,
    errorMessage: null,
    currencyRates: INITIAL_RATES,
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

    get state() {
        return this._store();
    }

    async initApp() {
        this._store.setState({isLoading: true})
        await this.initRates()
        await this.initCalcus()
        this.initContainerObserver()
        this._store.setState({isLoading: false, isCalculatorInit: true})
    }

    async initRates(): Promise<void> {
        const rates = await Api.getRates()
        this._store.setState({currencyRates: rates})
    }

    async initCalcus(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                window.CalcusWidget.show('Customs')
                resolve()
            }, 2000)
        })
    }

    initContainerObserver() {
        const container = document.querySelector('#calcus-container');
        if (!container) return;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.initLoaderObserver();
                    this.initResultObserver();
                }
            });
        });
        observer.observe(container, {childList: true, subtree: true});
    }

    initLoaderObserver() {
        const targetElement = document.querySelector('.loading-row');
        if (!targetElement) return;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const display = window.getComputedStyle(targetElement).display;
                    if (display === 'none') {
                        this._store.setState({isLoading: false})
                    } else {
                        this._store.setState({isLoading: true})
                    }
                }
            });
        });
        observer.observe(targetElement, {attributes: true, attributeFilter: ['style']});
    }

    initResultObserver() {
        const targetElement = document.querySelector('.result-placeholder-total2');
        if (!targetElement) return;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type !== 'childList') return
                const store = this._store.getState()

                const customsFee = getValueByClass('result-placeholder-sbor');
                const customsDuty = getValueByClass('result-placeholder-tax');
                const excise = getValueByClass('result-placeholder-excise');
                const vat = getValueByClass('result-placeholder-nds');
                const utilizationFee = getValueByClass('result-placeholder-util');
                const totalWithCarPrice = getValueByClass('result-placeholder-total2');
                const japanExpanses = convert(CONFIG.JAPAN_EXPENSES, store.currencyRates.JPY);


                this._store.setState({
                    customsFee: customsFee || 0,
                    customsDuty: customsDuty || 0,
                    exciseDuty: excise || 0,
                    vat: vat || 0,
                    recyclingFee: utilizationFee || 0,
                    japanExpanses,
                    companyCommission: CONFIG.COMPANY_COMMISSION,
                    price: totalWithCarPrice || 0,
                    brokerExpenses: CONFIG.BROKER_COMMISSION
                })
            });
        });
        observer.observe(targetElement, {childList: true, subtree: true});
    }
}

export const rootStore = new RootStore();
