export type YearMatrixInput = {
  birthDate: string;
  targetYear: number;
  fullName?: string;
};

export type CalculationStep = {
  key: string;
  label: string;
  formula: string;
  input: string;
  value: number;
};

export type YearMatrixResult = {
  formulaVersion: string;
  input: YearMatrixInput;
  values: Record<string, number>;
  steps: CalculationStep[];
};

const FORMULA_VERSION = '0.1.0';

export function calculateYearMatrix(input: YearMatrixInput): YearMatrixResult {
  const normalizedBirthDate = normalizeBirthDate(input.birthDate);
  const targetYear = normalizeTargetYear(input.targetYear);
  const [, month, day] = normalizedBirthDate.split('-');
  const digitSource = `${month}${day}${targetYear}`;
  const personalYearSeed = sumDigits(digitSource);

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
      targetYear,
    },
    values: {
      personalYearSeed,
    },
    steps: [
      {
        key: 'personalYearSeed',
        label: 'Personal Year Seed',
        formula: 'sumDigits(MMDD + targetYear)',
        input: digitSource,
        value: personalYearSeed,
      },
    ],
  };
}

function normalizeBirthDate(birthDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    throw new Error('birthDate must use YYYY-MM-DD format.');
  }

  const date = new Date(`${birthDate}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== birthDate) {
    throw new Error('birthDate must be a valid calendar date.');
  }

  return birthDate;
}

function normalizeTargetYear(targetYear: number): number {
  if (!Number.isInteger(targetYear) || targetYear < 1) {
    throw new Error('targetYear must be a positive integer.');
  }

  return targetYear;
}

function sumDigits(value: string): number {
  return value
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}
