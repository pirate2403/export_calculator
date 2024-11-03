import {Car} from "../interfaces";

export interface RecyclingRate {
    UNDER_3000: number;
    BETWEEN_3001_3500: number;
    OVER_3500: number;
}

export interface RecyclingFeeConfig {
    BASE: readonly [number, number];
    RATES: readonly RecyclingRate[];
}

export class RecyclingFeeService {

    constructor(private _config: RecyclingFeeConfig) {
    }

    calculate(car: Car): number {
        const rate = this._getRecyclingFeeRate(car.carAgeGroup, car.engineVolume);
        const base = this._config.BASE[car.ownerType];
        return Math.floor(base * rate);
    }

    private _getRecyclingFeeRate(carAge: number, engineVolume: number = 1): number {
        if (engineVolume < 3001) return this._config.RATES[carAge].UNDER_3000;
        if (engineVolume < 3501)
            return this._config.RATES[carAge].BETWEEN_3001_3500;
        return this._config.RATES[carAge].OVER_3500;
    }
}
