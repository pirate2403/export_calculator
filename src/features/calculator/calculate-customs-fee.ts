import { CUSTOMS_FEE } from "./constants";

export function calculateCustomsFee(rubPrice: number): number {
  if (rubPrice < 200_000) {
    return CUSTOMS_FEE["<200_000"];
  }
  if (rubPrice < 450_000) {
    return CUSTOMS_FEE["<450_000"];
  }
  if (rubPrice < 1_200_000) {
    return CUSTOMS_FEE["<1_200_000"];
  }
  if (rubPrice < 2_700_000) {
    return CUSTOMS_FEE["<2_700_000"];
  }
  if (rubPrice < 4_200_000) {
    return CUSTOMS_FEE["<4_200_000"];
  }
  if (rubPrice < 5_500_000) {
    return CUSTOMS_FEE["<5_500_000"];
  }
  if (rubPrice < 7_000_000) {
    return CUSTOMS_FEE["<7_000_000"];
  }
  if (rubPrice < 8_000_000) {
    return CUSTOMS_FEE["<8_000_000"];
  }
  if (rubPrice < 9_000_000) {
    return CUSTOMS_FEE["<9_000_000"];
  }
  if (rubPrice < 10_000_000) {
    return CUSTOMS_FEE["<10_000_000"];
  }
  return CUSTOMS_FEE[">10_000_000"];
}
