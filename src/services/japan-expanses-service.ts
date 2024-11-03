import {Car} from "../interfaces";

export interface JapanExpansesConfig {
    PORT_DELIVERY: number;
    FREIGHT: readonly [number, number];
    SANCTION_CONDITIONS: {
        engineVolume: number;
        engineType: readonly [number, number];
    };
}

export class JapanExpansesService {
    constructor(private _config: JapanExpansesConfig) {
    }

    calculate(car: Car): number {
        const freightIndex = Number(this._config.SANCTION_CONDITIONS.engineVolume <= car.engineVolume);
        const freight = this._config.FREIGHT[freightIndex];
        const delivery = this._config.PORT_DELIVERY;
        return freight + delivery;
    }
}
