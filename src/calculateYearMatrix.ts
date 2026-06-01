import { reduceToEnergy, sumDigits } from './reduceToEnergy';
import type { BirthDateInput, CalculationResult, CalculationStep, YearMatrixValues } from './types';

export type YearMatrixInput = BirthDateInput & {
  targetYear: number;
};

export type YearMatrixPoint = keyof YearMatrixValues & string;
export type YearMatrixResult = Omit<CalculationResult<YearMatrixValues>, 'input' | 'steps'> & {
  input: YearMatrixInput;
  steps: CalculationStep<YearMatrixPoint>[];
};

const FORMULA_VERSION = '1.0.0';

export function calculateYearMatrix(input: YearMatrixInput): YearMatrixResult {
  const { birthYear, birthMonth, birthDay, normalizedBirthDate } = parseBirthDate(input.birthDate);
  const targetYear = normalizeTargetYear(input.targetYear);
  const steps: CalculationStep<YearMatrixPoint>[] = [];
  const values = {} as YearMatrixValues;
  const dayCode = isLeapYear(targetYear) ? 15 : 14;

  values.DayCode = addStep(
    steps,
    'DayCode',
    'isLeapYear(targetYear) ? 15 : 14',
    String(targetYear),
    dayCode,
    false,
  );
  values.YearCode = addStep(
    steps,
    'YearCode',
    'reduceToEnergy(sumDigits(targetYear))',
    String(targetYear),
    sumDigits(targetYear),
  );
  values.MonthCode = addStep(steps, 'MonthCode', 'YearCode + 12', `${values.YearCode} + 12`, values.YearCode + 12, false);

  values.A_Year = addStep(steps, 'A_Year', 'reduceToEnergy(birthDay + DayCode)', `${birthDay} + ${values.DayCode}`, birthDay + values.DayCode);
  values.B_Year = addStep(steps, 'B_Year', 'reduceToEnergy(birthMonth + MonthCode)', `${birthMonth} + ${values.MonthCode}`, birthMonth + values.MonthCode);
  values.V_Year = addStep(steps, 'V_Year', 'reduceToEnergy(birthYear + targetYear)', `${birthYear} + ${targetYear}`, birthYear + targetYear);
  values.G_Year = addStep(steps, 'G_Year', 'reduceToEnergy(A_Year + B_Year + V_Year)', `${values.A_Year} + ${values.B_Year} + ${values.V_Year}`, values.A_Year + values.B_Year + values.V_Year);
  values.D_Year = addStep(steps, 'D_Year', 'reduceToEnergy(A_Year + B_Year + V_Year + G_Year)', `${values.A_Year} + ${values.B_Year} + ${values.V_Year} + ${values.G_Year}`, values.A_Year + values.B_Year + values.V_Year + values.G_Year);

  values.E_Year = addStep(steps, 'E_Year', 'reduceToEnergy(A_Year + B_Year)', `${values.A_Year} + ${values.B_Year}`, values.A_Year + values.B_Year);
  values.Yo_Year = addStep(steps, 'Yo_Year', 'reduceToEnergy(B_Year + V_Year)', `${values.B_Year} + ${values.V_Year}`, values.B_Year + values.V_Year);
  values.Zh_Year = addStep(steps, 'Zh_Year', 'reduceToEnergy(V_Year + G_Year)', `${values.V_Year} + ${values.G_Year}`, values.V_Year + values.G_Year);
  values.Z_Year = addStep(steps, 'Z_Year', 'reduceToEnergy(G_Year + A_Year)', `${values.G_Year} + ${values.A_Year}`, values.G_Year + values.A_Year);

  values.K_Year = addStep(steps, 'K_Year', 'reduceToEnergy(D_Year + G_Year)', `${values.D_Year} + ${values.G_Year}`, values.D_Year + values.G_Year);
  values.L_Year = addStep(steps, 'L_Year', 'reduceToEnergy(D_Year + V_Year)', `${values.D_Year} + ${values.V_Year}`, values.D_Year + values.V_Year);
  values.M_Year = addStep(steps, 'M_Year', 'reduceToEnergy(K_Year + L_Year)', `${values.K_Year} + ${values.L_Year}`, values.K_Year + values.L_Year);

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
      targetYear,
    },
    values,
    steps,
  };
}

function addStep(
  steps: CalculationStep<YearMatrixPoint>[],
  key: YearMatrixPoint,
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

function normalizeTargetYear(targetYear: number): number {
  if (!Number.isInteger(targetYear) || targetYear < 1) {
    throw new Error('targetYear must be a positive integer.');
  }

  return targetYear;
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
