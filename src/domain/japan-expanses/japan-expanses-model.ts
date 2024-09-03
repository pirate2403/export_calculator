import { JapanExpansesValues } from "./japan-expanses-repos";

export class JapanExpansesModel {
  private _expanses: JapanExpansesValues = {
    freight: 0,
    delivery: 0,
  };

  get expanses(): JapanExpansesValues {
    return this._expanses;
  }

  set expanses(value: JapanExpansesValues) {
    this._expanses = value;
  }
}
