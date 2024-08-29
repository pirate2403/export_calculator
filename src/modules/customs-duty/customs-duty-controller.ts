import { CustomsDutyModel } from "./customs-duty-model";
import { CustomsDutyConfig, CustomsDutyRate } from "./customs-duty-repos";

export class CustomsDutyController {
  private _model: CustomsDutyModel = new CustomsDutyModel();
  private _calculator = [
    this._calculateUnder3Years.bind(this),
    this._calculate3To5YearsYears.bind(this),
    this._calculateOver5Years.bind(this),
  ];

  constructor(private _config: CustomsDutyConfig) {}

  get customsDuty(): number {
    return this._model.duty;
  }

  calculate(carAgeGroup: number, engineVolume: number, eurPrice: number): void {
    const calculator = this._calculator[carAgeGroup];
    this._model.duty = calculator(engineVolume, eurPrice);
  }

  reset(): void {
    this._model.duty = 0;
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
