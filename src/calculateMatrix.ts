import { reduceToEnergy, sumDigits } from './reduceToEnergy';
import type { BaseMatrixValues, BirthDateInput, CalculationResult, CalculationStep } from './types';

export type MatrixInput = BirthDateInput;
export type MatrixPoint = keyof BaseMatrixValues & string;
export type MatrixResult = Omit<CalculationResult<BaseMatrixValues>, 'input' | 'steps'> & {
  input: MatrixInput;
  steps: CalculationStep<MatrixPoint>[];
};

const FORMULA_VERSION = '1.0.0';

export function calculateMatrix(input: MatrixInput): MatrixResult {
  const { birthYear, birthMonth, birthDay, normalizedBirthDate } = parseBirthDate(input.birthDate);
  const steps: CalculationStep<MatrixPoint>[] = [];
  const values = {} as BaseMatrixValues;

  values.A = addStep(steps, 'A', 'reduceToEnergy(birthDay)', String(birthDay), birthDay);
  values.B = addStep(steps, 'B', 'birthMonth', String(birthMonth), birthMonth, false);
  values.V = addStep(steps, 'V', 'reduceToEnergy(sumDigits(birthYear))', String(birthYear), sumDigits(birthYear));
  values.G = addStep(steps, 'G', 'reduceToEnergy(A + B + V)', `${values.A} + ${values.B} + ${values.V}`, values.A + values.B + values.V);
  values.D = addStep(steps, 'D', 'reduceToEnergy(A + B + V + G)', `${values.A} + ${values.B} + ${values.V} + ${values.G}`, values.A + values.B + values.V + values.G);

  values.A1 = addStep(steps, 'A1', 'reduceToEnergy(A + D)', `${values.A} + ${values.D}`, values.A + values.D);
  values.A2 = addStep(steps, 'A2', 'reduceToEnergy(A + A1)', `${values.A} + ${values.A1}`, values.A + values.A1);
  values.B1 = addStep(steps, 'B1', 'reduceToEnergy(B + D)', `${values.B} + ${values.D}`, values.B + values.D);
  values.B2 = addStep(steps, 'B2', 'reduceToEnergy(B + B1)', `${values.B} + ${values.B1}`, values.B + values.B1);
  values.V1 = addStep(steps, 'V1', 'reduceToEnergy(V + D)', `${values.V} + ${values.D}`, values.V + values.D);
  values.V2 = addStep(steps, 'V2', 'reduceToEnergy(V + V1)', `${values.V} + ${values.V1}`, values.V + values.V1);
  values.G1 = addStep(steps, 'G1', 'reduceToEnergy(G + D)', `${values.G} + ${values.D}`, values.G + values.D);
  values.G2 = addStep(steps, 'G2', 'reduceToEnergy(G + G1)', `${values.G} + ${values.G1}`, values.G + values.G1);

  values.E = addStep(steps, 'E', 'reduceToEnergy(A + B)', `${values.A} + ${values.B}`, values.A + values.B);
  values.Yo = addStep(steps, 'Yo', 'reduceToEnergy(B + V)', `${values.B} + ${values.V}`, values.B + values.V);
  values.Zh = addStep(steps, 'Zh', 'reduceToEnergy(V + G)', `${values.V} + ${values.G}`, values.V + values.G);
  values.Z = addStep(steps, 'Z', 'reduceToEnergy(G + A)', `${values.G} + ${values.A}`, values.G + values.A);
  values.D1 = addStep(steps, 'D1', 'reduceToEnergy(E + Yo + Zh + Z)', `${values.E} + ${values.Yo} + ${values.Zh} + ${values.Z}`, values.E + values.Yo + values.Zh + values.Z);

  values.K = addStep(steps, 'K', 'reduceToEnergy(D + G1)', `${values.D} + ${values.G1}`, values.D + values.G1);
  values.L = addStep(steps, 'L', 'reduceToEnergy(D + V1)', `${values.D} + ${values.V1}`, values.D + values.V1);
  values.M = addStep(steps, 'M', 'reduceToEnergy(K + L)', `${values.K} + ${values.L}`, values.K + values.L);

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
    },
    values,
    steps,
  };
}

function addStep(
  steps: CalculationStep<MatrixPoint>[],
  key: MatrixPoint,
  formula: string,
  stepInput: string,
  rawValue: number,
  shouldReduce = true,
): number {
  const value = shouldReduce ? reduceToEnergy(rawValue) : rawValue;

  steps.push({
    key,
    formula,
    input: stepInput,
    rawValue,
    value,
  });

  return value;
}

function parseBirthDate(birthDate: string): {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  normalizedBirthDate: string;
} {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    throw new Error('birthDate must use YYYY-MM-DD format.');
  }

  const date = new Date(`${birthDate}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== birthDate) {
    throw new Error('birthDate must be a valid calendar date.');
  }

  const [year, month, day] = birthDate.split('-').map(Number);

  return {
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    normalizedBirthDate: birthDate,
  };
}
