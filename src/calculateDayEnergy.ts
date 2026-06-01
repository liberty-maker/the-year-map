import { parseBirthDate, parseDateString, validateTargetDay } from './dateUtils';
import { reduceToEnergy } from './reduceToEnergy';
import type { BirthDateInput, CalculationResult, CalculationStep, DayEnergyValues } from './types';

export type DayEnergyInput = {
  birthDate: BirthDateInput;
  targetDate: string;
};

export type DayEnergyPoint = keyof DayEnergyValues & string;
export type DayEnergyResult = Omit<CalculationResult<DayEnergyValues>, 'input' | 'steps'> & {
  input: DayEnergyInput;
  steps: CalculationStep<DayEnergyPoint>[];
};

const FORMULA_VERSION = 'day-energy-v1';

export function calculateDayEnergy(input: DayEnergyInput): DayEnergyResult {
  const birthDate = parseBirthDate(input.birthDate);
  const targetDate = parseDateString(input.targetDate, 'targetDate');
  validateTargetDay(targetDate.year, targetDate.month, targetDate.day);

  const steps: CalculationStep<DayEnergyPoint>[] = [];
  const values = {
    targetDate: input.targetDate,
  } as DayEnergyValues;

  values.A_Day = addStep(steps, 'A_Day', 'reduceToEnergy(birthDay + targetDay)', `${birthDate.day} + ${targetDate.day}`, birthDate.day + targetDate.day);
  values.B_Day = addStep(steps, 'B_Day', 'reduceToEnergy(birthMonth + targetMonth)', `${birthDate.month} + ${targetDate.month}`, birthDate.month + targetDate.month);
  values.G_Day = addStep(steps, 'G_Day', 'reduceToEnergy(A_Day + B_Day)', `${values.A_Day} + ${values.B_Day}`, values.A_Day + values.B_Day);
  values.D_Day = addStep(steps, 'D_Day', 'reduceToEnergy(A_Day + B_Day + G_Day)', `${values.A_Day} + ${values.B_Day} + ${values.G_Day}`, values.A_Day + values.B_Day + values.G_Day);

  return {
    formulaVersion: FORMULA_VERSION,
    input,
    values,
    steps,
  };
}

function addStep(
  steps: CalculationStep<DayEnergyPoint>[],
  key: DayEnergyPoint,
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
