export class CustomsDutyModel {
  private _duty: number = 0;

  get duty(): number {
    return this._duty;
  }

  set duty(value: number) {
    this._duty = value;
  }
}
