import { calculateMatrix } from './calculateMatrix';
import { calculateYearMatrix } from './calculateYearMatrix';

const birthDate = '1998-06-15';

const matrix = calculateMatrix({ birthDate });
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

const yearMatrix2026 = calculateYearMatrix({ birthDate, targetYear: 2026 });
const expectedYearMatrix2026Values = {
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

const leapYearMatrix2024 = calculateYearMatrix({ birthDate, targetYear: 2024 });
const expectedLeapYearMatrix2024Values = {
  DayCode: 15,
  YearCode: 8,
  MonthCode: 20,
  A_Year: 3,
  B_Year: 8,
  V_Year: 8,
  G_Year: 19,
  D_Year: 11,
  E_Year: 11,
  Yo_Year: 16,
  Zh_Year: 9,
  Z_Year: 22,
  K_Year: 3,
  L_Year: 19,
  M_Year: 22,
};

assertValues('calculateMatrix', matrix.values, expectedMatrixValues);
assertValues('calculateYearMatrix 2026', yearMatrix2026.values, expectedYearMatrix2026Values);
assertValues('calculateYearMatrix 2024 leap year', leapYearMatrix2024.values, expectedLeapYearMatrix2024Values);
assertEqual('calculateMatrix step count', matrix.steps.length, Object.keys(expectedMatrixValues).length);
assertEqual('calculateYearMatrix 2026 step count', yearMatrix2026.steps.length, Object.keys(expectedYearMatrix2026Values).length);
assertEqual('calculateYearMatrix 2024 leap year step count', leapYearMatrix2024.steps.length, Object.keys(expectedLeapYearMatrix2024Values).length);

function assertValues(name: string, actual: Record<string, number>, expected: Record<string, number>): void {
  for (const [key, expectedValue] of Object.entries(expected)) {
    assertEqual(`${name}.${key}`, actual[key], expectedValue);
  }
}

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Calculation smoke test passed.');
