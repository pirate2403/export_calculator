export class RecyclingFeeModel {
  private _fee: number = 0;

  get fee(): number {
    return this._fee;
  }

  set fee(value: number) {
    this._fee = value;
  }
}
