import {Car} from "../interfaces";
import {ENGINE_TYPE} from "../constants";


export interface ExciseDutyConfig {
    UNDER_90_HP: number;
    UNDER_150_HP: number;
    UNDER_200_HP: number;
    UNDER_300_HP: number;
    UNDER_400_HP: number;
    UNDER_500_HP: number;
    OVER_500_HP: number;
}

export class ExciseDutyService {
    constructor(private _config: ExciseDutyConfig) {
    }

    calculate(car: Car): number {
        if (car.engineType !== ENGINE_TYPE.ELECTRIC) return 0;
        const rate = this._getEngineExciseRate(car.enginePower);
        return Math.floor(rate * car.enginePower);

    }

    private _getEngineExciseRate(enginePower: number): number {
        if (enginePower <= 90) return this._config.UNDER_90_HP;
        if (enginePower <= 150) return this._config.UNDER_150_HP;
        if (enginePower <= 200) return this._config.UNDER_200_HP;
        if (enginePower <= 300) return this._config.UNDER_300_HP;
        if (enginePower <= 400) return this._config.UNDER_400_HP;
        if (enginePower <= 500) return this._config.UNDER_500_HP;
        return this._config.OVER_500_HP;
    }
}
