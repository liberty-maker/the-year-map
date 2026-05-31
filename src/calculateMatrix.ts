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

export type MatrixValues = {
  A: number;
  B: number;
  V: number;
  G: number;
  D: number;
  A1: number;
  A2: number;
  B1: number;
  B2: number;
  V1: number;
  V2: number;
  G1: number;
  G2: number;
  E: number;
  Yo: number;
  Zh: number;
  Z: number;
  D1: number;
  K: number;
  L: number;
  M: number;
};

export type MatrixResult = {
  formulaVersion: string;
  input: MatrixInput;
  values: MatrixValues;
  steps: CalculationStep[];
};

const FORMULA_VERSION = '1.0.0';

export function calculateMatrix(input: MatrixInput): MatrixResult {
  const normalizedBirthDate = normalizeBirthDate(input.birthDate);
  const { birthYear, birthMonth, birthDay } = parseBirthDate(normalizedBirthDate);

  const steps: CalculationStep[] = [];

  const A = addStep(steps, 'A', 'Point A', 'reduceToEnergy(birthDay)', String(birthDay), reduceToEnergy(birthDay));
  const B = addStep(steps, 'B', 'Point B', 'birthMonth', String(birthMonth), birthMonth);
  const V = addStep(steps, 'V', 'Point V', 'reduceToEnergy(sumDigits(birthYear))', String(birthYear), reduceToEnergy(sumDigits(String(birthYear))));
  const G = addStep(steps, 'G', 'Point G', 'reduceToEnergy(A + B + V)', `${A} + ${B} + ${V}`, reduceToEnergy(A + B + V));
  const D = addStep(steps, 'D', 'Point D', 'reduceToEnergy(A + B + V + G)', `${A} + ${B} + ${V} + ${G}`, reduceToEnergy(A + B + V + G));

  const A1 = addStep(steps, 'A1', 'Point A1', 'reduceToEnergy(A + D)', `${A} + ${D}`, reduceToEnergy(A + D));
  const A2 = addStep(steps, 'A2', 'Point A2', 'reduceToEnergy(A + A1)', `${A} + ${A1}`, reduceToEnergy(A + A1));
  const B1 = addStep(steps, 'B1', 'Point B1', 'reduceToEnergy(B + D)', `${B} + ${D}`, reduceToEnergy(B + D));
  const B2 = addStep(steps, 'B2', 'Point B2', 'reduceToEnergy(B + B1)', `${B} + ${B1}`, reduceToEnergy(B + B1));
  const V1 = addStep(steps, 'V1', 'Point V1', 'reduceToEnergy(V + D)', `${V} + ${D}`, reduceToEnergy(V + D));
  const V2 = addStep(steps, 'V2', 'Point V2', 'reduceToEnergy(V + V1)', `${V} + ${V1}`, reduceToEnergy(V + V1));
  const G1 = addStep(steps, 'G1', 'Point G1', 'reduceToEnergy(G + D)', `${G} + ${D}`, reduceToEnergy(G + D));
  const G2 = addStep(steps, 'G2', 'Point G2', 'reduceToEnergy(G + G1)', `${G} + ${G1}`, reduceToEnergy(G + G1));

  const E = addStep(steps, 'E', 'Point E', 'reduceToEnergy(A + B)', `${A} + ${B}`, reduceToEnergy(A + B));
  const Yo = addStep(steps, 'Yo', 'Point Yo', 'reduceToEnergy(B + V)', `${B} + ${V}`, reduceToEnergy(B + V));
  const Zh = addStep(steps, 'Zh', 'Point Zh', 'reduceToEnergy(V + G)', `${V} + ${G}`, reduceToEnergy(V + G));
  const Z = addStep(steps, 'Z', 'Point Z', 'reduceToEnergy(G + A)', `${G} + ${A}`, reduceToEnergy(G + A));
  const D1 = addStep(steps, 'D1', 'Point D1', 'reduceToEnergy(E + Yo + Zh + Z)', `${E} + ${Yo} + ${Zh} + ${Z}`, reduceToEnergy(E + Yo + Zh + Z));

  const K = addStep(steps, 'K', 'Point K', 'reduceToEnergy(D + G1)', `${D} + ${G1}`, reduceToEnergy(D + G1));
  const L = addStep(steps, 'L', 'Point L', 'reduceToEnergy(D + V1)', `${D} + ${V1}`, reduceToEnergy(D + V1));
  const M = addStep(steps, 'M', 'Point M', 'reduceToEnergy(K + L)', `${K} + ${L}`, reduceToEnergy(K + L));

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: normalizedBirthDate,
    },
    values: { A, B, V, G, D, A1, A2, B1, B2, V1, V2, G1, G2, E, Yo, Zh, Z, D1, K, L, M },
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

function parseBirthDate(birthDate: string): { birthYear: number; birthMonth: number; birthDay: number } {
  const [year, month, day] = birthDate.split('-').map(Number);
  return { birthYear: year, birthMonth: month, birthDay: day };
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
