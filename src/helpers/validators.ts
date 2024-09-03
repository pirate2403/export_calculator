import { JAPAN_EXPENSES_CONFIG } from "../config/japan-expanses-config";

const { SANCTION_CONDITIONS } = JAPAN_EXPENSES_CONFIG;

export function engineVolumeValidator(_: unknown, val: number) {
  return val < SANCTION_CONDITIONS.engineVolume
    ? Promise.resolve("")
    : Promise.reject("Автомобиль подпадает под санкции");
}
export function engineTypeValidator(_: unknown, val: number) {
  const hasValue = SANCTION_CONDITIONS.engineType.find((i) => i === val);
  return hasValue
    ? Promise.reject("Автомобиль подпадает под санкции")
    : Promise.resolve();
}
