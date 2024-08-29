import { RecyclingFeeModel } from "./recycling-fee-model";
import { RecyclingFeeConfig } from "./recycling-fee-repos";

export class RecyclingFeeController {
  private _model: RecyclingFeeModel = new RecyclingFeeModel();

  constructor(private _config: RecyclingFeeConfig) {}

  get recyclingFee(): number {
    return this._model.fee;
  }

  calculate(owner: number, carAge: number, engineVolume: number): void {
    const rate = this._getRecyclingFeeRate(carAge, engineVolume);
    const base = this._config.BASE[owner];
    this._model.fee = Math.floor(base * rate);
  }

  reset(): void {
    this._model.fee = 0;
  }

  private _getRecyclingFeeRate(carAge: number, engineVolume: number): number {
    if (engineVolume < 3001) return this._config.RATES[carAge].UNDER_3000;
    if (engineVolume < 3501)
      return this._config.RATES[carAge].BETWEEN_3001_3500;
    return this._config.RATES[carAge].OVER_3500;
  }
}
