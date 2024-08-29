import { CustomsFeeModel } from "./customs-fee-model";
import { CustomsFeeConfig } from "./customs-fee-repos";

export class CustomsFeeController {
  private _model: CustomsFeeModel = new CustomsFeeModel();

  constructor(private _config: CustomsFeeConfig) {}

  get customsFee(): number {
    return this._model.fee;
  }

  calculate(rubPrice: number): void {
    this._model.fee = this.getCustomsFee(rubPrice);
  }

  reset(): void {
    this._model.fee = 0;
  }

  private getCustomsFee(rubPrice: number): number {
    if (rubPrice < 200_000) return this._config.UNDER_200K;
    if (rubPrice < 450_000) return this._config.UNDER_450K;
    if (rubPrice < 1_200_000) return this._config.UNDER_1_2M;
    if (rubPrice < 2_700_000) return this._config.UNDER_2_7M;
    if (rubPrice < 4_200_000) return this._config.UNDER_4_2M;
    if (rubPrice < 5_500_000) return this._config.UNDER_5_5M;
    if (rubPrice < 7_000_000) return this._config.UNDER_7M;
    if (rubPrice < 8_000_000) return this._config.UNDER_8M;
    if (rubPrice < 9_000_000) return this._config.UNDER_9M;
    if (rubPrice < 10_000_000) return this._config.UNDER_10M;
    return this._config.OVER_10M;
  }
}
