export interface JapanExpansesConfig {
  PORT_DELIVERY: number;
  FREIGHT: number;
  SANCTION_FREIGHT: number;
  SANCTION_CONDITIONS: {
    engineVolume: number;
    engineType: readonly [number, number];
  };
}

export interface JapanExpansesValues {
  freight: number;
  delivery: number;
}
