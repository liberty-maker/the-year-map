import { calculateDayEnergy } from './calculateDayEnergy';
import { calculateHealthMap } from './calculateHealthMap';
import { calculateMatrix } from './calculateMatrix';
import { calculateMonthEnergy } from './calculateMonthEnergy';
import { calculateYearMatrix } from './calculateYearMatrix';
import type { CalculationResult, CalculationStep, Gender, YearMapProfileInput, YearMapProfileValues } from './types';

export type YearMapProfileStepKey = 'baseMatrix' | 'yearMatrix' | 'healthMap' | 'monthEnergy' | 'dayEnergy';
export type YearMapProfileResult = Omit<CalculationResult<YearMapProfileValues, YearMapProfileInput>, 'steps'> & {
  steps: CalculationStep<YearMapProfileStepKey>[];
};

const FORMULA_VERSION = 'year-map-profile-v1';

export function calculateYearMapProfile(input: YearMapProfileInput): YearMapProfileResult {
  const gender: Gender = input.gender ?? 'unspecified';
  const birthDate = {
    ...input.birthDate,
    gender,
  };

  const baseMatrix = calculateMatrix(birthDate);
  const yearMatrix = calculateYearMatrix({
    ...birthDate,
    targetYear: input.targetYear,
  });
  const healthMap = calculateHealthMap(baseMatrix);
  const monthEnergy = calculateMonthEnergy({
    birthDate,
    targetYear: input.targetYear,
    targetMonth: input.targetMonth,
  });
  const dayEnergy = calculateDayEnergy({
    birthDate,
    targetDate: input.targetDate,
  });

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate,
      gender,
    },
    values: {
      birthDate,
      gender,
      targetYear: input.targetYear,
      targetMonth: input.targetMonth,
      targetDate: input.targetDate,
      baseMatrix: baseMatrix.values,
      yearMatrix: yearMatrix.values,
      healthMap: healthMap.values,
      monthEnergy: monthEnergy.values,
      dayEnergy: dayEnergy.values,
    },
    steps: [
      createStep('baseMatrix', 'calculateMatrix(birthDate)', baseMatrix.values.D),
      createStep('yearMatrix', 'calculateYearMatrix(birthDate, targetYear)', yearMatrix.values.D_Year),
      createStep('healthMap', 'calculateHealthMap(baseMatrix)', healthMap.values.overallBalance),
      createStep('monthEnergy', 'calculateMonthEnergy(birthDate, targetYear, targetMonth)', monthEnergy.values.D_Month),
      createStep('dayEnergy', 'calculateDayEnergy(birthDate, targetDate)', dayEnergy.values.D_Day),
    ],
  };
}

function createStep(
  key: YearMapProfileStepKey,
  formula: string,
  representativeValue: number,
): CalculationStep<YearMapProfileStepKey> {
  return {
    key,
    formula,
    input: 'calculated',
    rawValue: representativeValue,
    value: representativeValue,
  };
}
