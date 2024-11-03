import {Car} from "../interfaces";
import {ENGINE_TYPE} from "../constants";

export interface CustomsDutyConfig {
    customsDutyUnder3Years: CustomsDutyUnder3Years;
    customsDuty3To5Years: CustomsDuty3To5Years;
    customsDutyOver5Years: CustomsDutyOver5Years;
    customsDutyElectric: number
}

export type CustomsDutyRate = {
    minPerCm3: number;
    percentage: number;
};

export type CustomsDutyUnder3Years = {
    UNDER_8500: CustomsDutyRate;
    BETWEEN_8500_16700: CustomsDutyRate;
    BETWEEN_16700_42300: CustomsDutyRate;
    BETWEEN_42300_84500: CustomsDutyRate;
    BETWEEN_84500_169000: CustomsDutyRate;
    OVER_169000: CustomsDutyRate;
};

export type CustomsDuty3To5Years = {
    UNDER_1000: CustomsDutyRate;
    BETWEEN_1001_1500: CustomsDutyRate;
    BETWEEN_1501_1800: CustomsDutyRate;
    BETWEEN_1801_2300: CustomsDutyRate;
    BETWEEN_2301_3000: CustomsDutyRate;
    OVER_3001: CustomsDutyRate;
};

export type CustomsDutyOver5Years = {
    UNDER_1000: CustomsDutyRate;
    BETWEEN_1001_1500: CustomsDutyRate;
    BETWEEN_1501_1800: CustomsDutyRate;
    BETWEEN_1801_2300: CustomsDutyRate;
    BETWEEN_2301_3000: CustomsDutyRate;
    OVER_3001: CustomsDutyRate;
};

export class CustomsDutyService {
    private _engineCalculator = [
        this._calculateUnder3Years.bind(this),
        this._calculate3To5YearsYears.bind(this),
        this._calculateOver5Years.bind(this),
    ];

    constructor(private _config: CustomsDutyConfig) {
    }

    calculate(car: Car, eurPrice: number): number {
        return car.engineType === ENGINE_TYPE.ELECTRIC ? this._calculateElectric(eurPrice) : this._calculateEngines(car, eurPrice);
    }

    private _calculateEngines(car: Car, eurPrice: number): number {
        const calculator = this._engineCalculator[car.carAgeGroup];
        return calculator(car.engineVolume, eurPrice);
    }

    private _calculateElectric(eurPrice: number): number {
        return Math.ceil(eurPrice * this._config.customsDutyElectric)
    }

    private _calculateUnder3Years(
        engineVolume: number,
        eurPrice: number
    ): number {
        const rate = this._getUnder3YearsRate(eurPrice);
        const percentagePrice = eurPrice * rate.percentage;
        const minPerCm3Price = rate.minPerCm3 * engineVolume;
        return Math.max(percentagePrice, minPerCm3Price);
    }

    private _calculate3To5YearsYears(engineVolume: number): number {
        const rate = this._get3To5YearsRate(engineVolume);
        return rate.minPerCm3 * engineVolume;
    }

    private _calculateOver5Years(engineVolume: number) {
        const rate = this._getOver5YearsRate(engineVolume);
        return rate.minPerCm3 * engineVolume;
    }

    private _getUnder3YearsRate(price: number): CustomsDutyRate {
        if (price <= 8500) {
            return this._config.customsDutyUnder3Years.UNDER_8500;
        }
        if (price <= 16700) {
            return this._config.customsDutyUnder3Years.BETWEEN_16700_42300;
        }
        if (price <= 42300) {
            return this._config.customsDutyUnder3Years.BETWEEN_16700_42300;
        }
        if (price <= 84500) {
            return this._config.customsDutyUnder3Years.BETWEEN_42300_84500;
        }
        if (price <= 169000) {
            return this._config.customsDutyUnder3Years.BETWEEN_84500_169000;
        }
        return this._config.customsDutyUnder3Years.OVER_169000;
    }

    private _get3To5YearsRate(engineVolume: number): CustomsDutyRate {
        if (engineVolume < 1001) {
            return this._config.customsDuty3To5Years.UNDER_1000;
        }
        if (engineVolume < 1501) {
            return this._config.customsDuty3To5Years.BETWEEN_1001_1500;
        }
        if (engineVolume < 1801) {
            return this._config.customsDuty3To5Years.BETWEEN_1501_1800;
        }
        if (engineVolume < 2301) {
            return this._config.customsDuty3To5Years.BETWEEN_1801_2300;
        }
        if (engineVolume < 3001) {
            return this._config.customsDuty3To5Years.BETWEEN_2301_3000;
        }
        return this._config.customsDuty3To5Years.OVER_3001;
    }

    private _getOver5YearsRate(engineVolume: number): CustomsDutyRate {
        if (engineVolume < 1001) {
            return this._config.customsDutyOver5Years.UNDER_1000;
        }
        if (engineVolume < 1501) {
            return this._config.customsDutyOver5Years.BETWEEN_1001_1500;
        }
        if (engineVolume < 1801) {
            return this._config.customsDutyOver5Years.BETWEEN_1501_1800;
        }
        if (engineVolume < 2301) {
            return this._config.customsDutyOver5Years.BETWEEN_1801_2300;
        }
        if (engineVolume < 3001) {
            return this._config.customsDutyOver5Years.BETWEEN_2301_3000;
        }
        return this._config.customsDutyOver5Years.OVER_3001;
    }
}