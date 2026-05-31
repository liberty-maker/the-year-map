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

export type YearMatrixValues = {
  DayCode: number;
  YearCode: number;
  MonthCode: number;
  A_Year: number;
  B_Year: number;
  V_Year: number;
  G_Year: number;
  D_Year: number;
  E_Year: number;
  Yo_Year: number;
  Zh_Year: number;
  Z_Year: number;
  K_Year: number;
  L_Year: number;
  M_Year: number;
};

export type YearMatrixResult = {
  formulaVersion: string;
  input: YearMatrixInput;
  values: YearMatrixValues;
  steps: CalculationStep[];
};

const FORMULA_VERSION = '1.0.0';

export function calculateYearMatrix(input: YearMatrixInput): YearMatrixResult {
  const normalizedBirthDate = normalizeBirthDate(input.birthDate);
  const targetYear = normalizeTargetYear(input.targetYear);
  const { birthYear, birthMonth, birthDay } = parseBirthDate(normalizedBirthDate);

  const steps: CalculationStep[] = [];

  const DayCode = addStep(
    steps,
    'DayCode',
    'Day Code',
    'isLeapYear(targetYear) ? 15 : 14',
    String(targetYear),
    isLeapYear(targetYear) ? 15 : 14,
  );

  const YearCode = addStep(
    steps,
    'YearCode',
    'Year Code',
    'reduceToEnergy(sumDigits(targetYear))',
    String(targetYear),
    reduceToEnergy(sumDigits(String(targetYear))),
  );

  const MonthCode = addStep(
    steps,
    'MonthCode',
    'Month Code',
    'YearCode + 12',
    `${YearCode} + 12`,
    YearCode + 12,
  );

  const A_Year = addStep(
    steps,
    'A_Year',
    'Year Point A',
    'reduceToEnergy(birthDay + DayCode)',
    `${birthDay} + ${DayCode}`,
    reduceToEnergy(birthDay + DayCode),
  );

  const B_Year = addStep(
    steps,
    'B_Year',
    'Year Point B',
    'reduceToEnergy(birthMonth + MonthCode)',
    `${birthMonth} + ${MonthCode}`,
    reduceToEnergy(birthMonth + MonthCode),
  );

  const V_Year = addStep(
    steps,
    'V_Year',
    'Year Point V',
    'reduceToEnergy(birthYear + targetYear)',
    `${birthYear} + ${targetYear}`,
    reduceToEnergy(birthYear + targetYear),
  );

  const G_Year = addStep(
    steps,
    'G_Year',
    'Year Point G',
    'reduceToEnergy(A_Year + B_Year + V_Year)',
    `${A_Year} + ${B_Year} + ${V_Year}`,
    reduceToEnergy(A_Year + B_Year + V_Year),
  );

  const D_Year = addStep(
    steps,
    'D_Year',
    'Year Point D',
    'reduceToEnergy(A_Year + B_Year + V_Year + G_Year)',
    `${A_Year} + ${B_Year} + ${V_Year} + ${G_Year}`,
    reduceToEnergy(A_Year + B_Year + V_Year + G_Year),
  );

  const E_Year = addStep(
    steps,
    'E_Year',
    'Year Point E',
    'reduceToEnergy(A_Year + B_Year)',
    `${A_Year} + ${B_Year}`,
    reduceToEnergy(A_Year + B_Year),
  );

  const Yo_Year = addStep(
    steps,
    'Yo_Year',
    'Year Point Yo',
    'reduceToEnergy(B_Year + V_Year)',
    `${B_Year} + ${V_Year}`,
    reduceToEnergy(B_Year + V_Year),
  );

  const Zh_Year = addStep(
    steps,
    'Zh_Year',
    'Year Point Zh',
    'reduceToEnergy(V_Year + G_Year)',
    `${V_Year} + ${G_Year}`,
    reduceToEnergy(V_Year + G_Year),
  );

  const Z_Year = addStep(
    steps,
    'Z_Year',
    'Year Point Z',
    'reduceToEnergy(G_Year + A_Year)',
    `${G_Year} + ${A_Year}`,
    reduceToEnergy(G_Year + A_Year),
  );

  const K_Year = addStep(
    steps,
    'K_Year',
    'Year Point K',
    'reduceToEnergy(D_Year + G_Year)',
    `${D_Year} + ${G_Year}`,
    reduceToEnergy(D_Year + G_Year),
  );

  const L_Year = addStep(
    steps,
    'L_Year',
    'Year Point L',
    'reduceToEnergy(D_Year + V_Year)',
    `${D_Year} + ${V_Year}`,
    reduceToEnergy(D_Year + V_Year),
  );

  const M_Year = addStep(
    steps,
    'M_Year',
    'Year Point M',
    'reduceToEnergy(K_Year + L_Year)',
    `${K_Year} + ${L_Year}`,
    reduceToEnergy(K_Year + L_Year),
  );

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
      targetYear,
    },
    values: {
      DayCode,
      YearCode,
      MonthCode,
      A_Year,
      B_Year,
      V_Year,
      G_Year,
      D_Year,
      E_Year,
      Yo_Year,
      Zh_Year,
      Z_Year,
      K_Year,
      L_Year,
      M_Year,
    },
    steps,
  };
}

function addStep(steps: CalculationStep[], key: string, label: string, formula: string, input: string, value: number): number {
  steps.push({ key, label, formula, input, value });
  return value;
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

function parseBirthDate(birthDate: string): { birthYear: number; birthMonth: number; birthDay: number } {
  const [year, month, day] = birthDate.split('-').map(Number);
  return { birthYear: year, birthMonth: month, birthDay: day };
}

function isLeapYear(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function reduceToEnergy(value: number): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('Energy source value must be a positive integer.');
  }

  let result = value;

  while (result > 22) {
    result = sumDigits(String(result));
  }

  return result;
}

function sumDigits(value: string): number {
  return value
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}
