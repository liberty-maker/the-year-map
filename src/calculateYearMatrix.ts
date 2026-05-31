export type YearMatrixInput = {
  birthDate: string;
  targetYear: number;
  fullName?: string;
};

export type YearMatrixPoint =
  | 'DayCode'
  | 'YearCode'
  | 'MonthCode'
  | 'A_Year'
  | 'B_Year'
  | 'V_Year'
  | 'G_Year'
  | 'D_Year'
  | 'E_Year'
  | 'Yo_Year'
  | 'Zh_Year'
  | 'Z_Year'
  | 'K_Year'
  | 'L_Year'
  | 'M_Year';

export type CalculationStep = {
  key: YearMatrixPoint;
  formula: string;
  input: string;
  rawValue: number;
  value: number;
};

export type YearMatrixResult = {
  formulaVersion: string;
  input: YearMatrixInput;
  values: Record<YearMatrixPoint, number>;
  steps: CalculationStep[];
};

const FORMULA_VERSION = '1.0.0';

export function calculateYearMatrix(input: YearMatrixInput): YearMatrixResult {
  const { birthYear, birthMonth, birthDay, normalizedBirthDate } = parseBirthDate(input.birthDate);
  const targetYear = normalizeTargetYear(input.targetYear);
  const steps: CalculationStep[] = [];
  const values = {} as Record<YearMatrixPoint, number>;

  values.DayCode = addStep(steps, 'DayCode', 'isLeapYear(targetYear) ? 15 : 14', String(targetYear), isLeapYear(targetYear) ? 15 : 14, false);
  values.YearCode = addStep(steps, 'YearCode', 'reduceToEnergy(sumDigits(targetYear))', String(targetYear), sumDigits(targetYear));
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
  steps: CalculationStep[],
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

function reduceToEnergy(value: number): number {
  let energy = value;

  while (energy > 22) {
    energy = sumDigits(energy);
  }

  return energy;
}

function sumDigits(value: number): number {
  return String(value)
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}
