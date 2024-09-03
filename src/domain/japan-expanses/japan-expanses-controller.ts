import { JapanExpansesModel } from "./japan-expanses-model";
import { JapanExpansesConfig } from "./japan-expanses-repos";
export class JapanExpansesController {
  private _model = new JapanExpansesModel();

  constructor(private _config: JapanExpansesConfig) {}

  get japanExpanses() {
    return this._model.expanses;
  }

  calculate(engineVolume: number) {
    const isSanction = this._isSanction(engineVolume);

    this._model.expanses = {
      freight: isSanction
        ? this._config.SANCTION_FREIGHT
        : this._config.FREIGHT,
      delivery: this._config.PORT_DELIVERY,
    };
  }

  private _isSanction(engineVolume: number) {
    return this._config.SANCTION_CONDITIONS.engineVolume <= engineVolume;
  }
}
