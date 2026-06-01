import { getDaysInMonth, parseBirthDate, validateTargetMonth, validateTargetYear } from './dateUtils';
import { reduceToEnergy } from './reduceToEnergy';
import type { BirthDateInput, CalculationResult, CalculationStep, MonthEnergyValues } from './types';

export type MonthEnergyInput = {
  birthDate: BirthDateInput;
  targetYear: number;
  targetMonth: number;
};

export type MonthEnergyPoint = keyof MonthEnergyValues & string;
export type MonthEnergyResult = Omit<CalculationResult<MonthEnergyValues>, 'input' | 'steps'> & {
  input: MonthEnergyInput;
  steps: CalculationStep<MonthEnergyPoint>[];
};

const FORMULA_VERSION = 'month-energy-v1';

export function calculateMonthEnergy(input: MonthEnergyInput): MonthEnergyResult {
  parseBirthDate(input.birthDate);
  validateTargetYear(input.targetYear);
  validateTargetMonth(input.targetMonth);

  const steps: CalculationStep<MonthEnergyPoint>[] = [];
  const daysInMonth = getDaysInMonth(input.targetYear, input.targetMonth);
  const values = {
    targetYear: input.targetYear,
    targetMonth: input.targetMonth,
    daysInMonth: addStep(steps, 'daysInMonth', 'getDaysInMonth(targetYear, targetMonth)', `${input.targetYear}-${input.targetMonth}`, daysInMonth, false),
  } as MonthEnergyValues;

  values.A_Month = addStep(steps, 'A_Month', 'monthLengthCode(daysInMonth)', String(values.daysInMonth), getMonthLengthCode(values.daysInMonth), false);
  values.B_Month = addStep(steps, 'B_Month', 'reduceToEnergy(targetMonth * daysInMonth)', `${values.targetMonth} * ${values.daysInMonth}`, values.targetMonth * values.daysInMonth);
  values.G_Month = addStep(steps, 'G_Month', 'reduceToEnergy(A_Month + B_Month)', `${values.A_Month} + ${values.B_Month}`, values.A_Month + values.B_Month);
  values.D_Month = addStep(steps, 'D_Month', 'reduceToEnergy(A_Month + B_Month + G_Month)', `${values.A_Month} + ${values.B_Month} + ${values.G_Month}`, values.A_Month + values.B_Month + values.G_Month);

  return {
    formulaVersion: FORMULA_VERSION,
    input,
    values,
    steps,
  };
}

function addStep(
  steps: CalculationStep<MonthEnergyPoint>[],
  key: MonthEnergyPoint,
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

function getMonthLengthCode(daysInMonth: number): number {
  if (daysInMonth === 28) return 19;
  if (daysInMonth === 29) return 20;
  if (daysInMonth === 30) return 6;
  if (daysInMonth === 31) return 10;

  throw new Error('daysInMonth must be 28, 29, 30, or 31.');
}
