export type Energy = number;

export type Gender = 'female' | 'male' | 'child' | 'unspecified';

export type BirthDateInput = {
  birthDate: string;
  fullName?: string;
  gender?: Gender;
};

export type CalculationStep<TKey extends string = string> = {
  key: TKey;
  formula: string;
  input: string;
  rawValue: number;
  value: Energy;
};

export type BaseMatrixValues = {
  A: Energy;
  B: Energy;
  V: Energy;
  G: Energy;
  D: Energy;
  A1: Energy;
  A2: Energy;
  B1: Energy;
  B2: Energy;
  V1: Energy;
  V2: Energy;
  G1: Energy;
  G2: Energy;
  E: Energy;
  Yo: Energy;
  Zh: Energy;
  Z: Energy;
  D1: Energy;
  K: Energy;
  L: Energy;
  M: Energy;
};

export type YearMatrixValues = {
  DayCode: Energy;
  YearCode: Energy;
  MonthCode: Energy;
  A_Year: Energy;
  B_Year: Energy;
  V_Year: Energy;
  G_Year: Energy;
  D_Year: Energy;
  E_Year: Energy;
  Yo_Year: Energy;
  Zh_Year: Energy;
  Z_Year: Energy;
  K_Year: Energy;
  L_Year: Energy;
  M_Year: Energy;
};

export type CalculationResult<TValues> = {
  formulaVersion: string;
  input: BirthDateInput;
  values: TValues;
  steps: CalculationStep[];
};
