import {Car} from "../interfaces";
import {ENGINE_TYPE} from "../constants";

export class VatService {
    calculate(car: Car, price: number, customDuty: number, exciseDuty: number): number {
        if (car.engineType !== ENGINE_TYPE.ELECTRIC) return 0;
        return Math.floor((price + customDuty + exciseDuty) * 0.2);
    }
}
