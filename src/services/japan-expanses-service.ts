import {Car} from "../interfaces";
import {ENGINE_TYPE} from "../constants";

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
        const freightIndex = Number(this._isSanction(car));
        const freight = this._config.FREIGHT[freightIndex];
        const delivery = this._config.PORT_DELIVERY;
        return freight + delivery;
    }

    private _isSanction(car: Car): boolean {
        return this._config.SANCTION_CONDITIONS.engineVolume < car.engineVolume || car.engineType === ENGINE_TYPE.ELECTRIC || car.engineType === ENGINE_TYPE.HYBRID
    }
}
