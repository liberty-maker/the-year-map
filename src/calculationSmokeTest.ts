import { calculateMatrix } from './calculateMatrix';
import { calculateYearMatrix } from './calculateYearMatrix';

const matrix = calculateMatrix({ birthDate: '1998-06-15' });
const expectedMatrixValues = {
  A: 15,
  B: 6,
  V: 9,
  G: 3,
  D: 6,
  A1: 21,
  A2: 9,
  B1: 12,
  B2: 18,
  V1: 15,
  V2: 6,
  G1: 9,
  G2: 12,
  E: 21,
  Yo: 15,
  Zh: 12,
  Z: 18,
  D1: 12,
  K: 15,
  L: 21,
  M: 9,
};

const yearMatrix = calculateYearMatrix({ birthDate: '1998-06-15', targetYear: 2026 });
const expectedYearMatrixValues = {
  DayCode: 14,
  YearCode: 10,
  MonthCode: 22,
  A_Year: 11,
  B_Year: 10,
  V_Year: 10,
  G_Year: 4,
  D_Year: 8,
  E_Year: 21,
  Yo_Year: 20,
  Zh_Year: 14,
  Z_Year: 15,
  K_Year: 12,
  L_Year: 18,
  M_Year: 3,
};

assertValues('calculateMatrix', matrix.values, expectedMatrixValues);
assertValues('calculateYearMatrix', yearMatrix.values, expectedYearMatrixValues);
assertStepCount('calculateMatrix', matrix.steps, Object.keys(expectedMatrixValues).length);
assertStepCount('calculateYearMatrix', yearMatrix.steps, Object.keys(expectedYearMatrixValues).length);

function assertValues(name: string, actual: Record<string, number>, expected: Record<string, number>): void {
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (actual[key] !== expectedValue) {
      throw new Error(`${name}.${key} expected ${expectedValue}, received ${actual[key]}.`);
    }
  }
}

function assertStepCount(name: string, steps: unknown[], expectedCount: number): void {
  if (steps.length !== expectedCount) {
    throw new Error(`${name} expected ${expectedCount} calculation steps, received ${steps.length}.`);
  }
}
