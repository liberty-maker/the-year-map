export type MatrixInput = {
  birthDate: string;
  fullName?: string;
};

export type CalculationStep = {
  key: string;
  label: string;
  formula: string;
  input: string;
  value: number;
};

export type MatrixResult = {
  formulaVersion: string;
  input: MatrixInput;
  values: Record<string, number>;
  steps: CalculationStep[];
};

const FORMULA_VERSION = '0.1.0';

export function calculateMatrix(input: MatrixInput): MatrixResult {
  const normalizedBirthDate = normalizeBirthDate(input.birthDate);
  const digitSource = normalizedBirthDate.replaceAll('-', '');
  const lifePathSeed = sumDigits(digitSource);

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
    },
    values: {
      lifePathSeed,
    },
    steps: [
      {
        key: 'lifePathSeed',
        label: 'Life Path Seed',
        formula: 'sumDigits(YYYYMMDD)',
        input: digitSource,
        value: lifePathSeed,
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

function sumDigits(value: string): number {
  return value
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}
