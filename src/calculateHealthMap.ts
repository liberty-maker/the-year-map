import { reduceToEnergy } from './reduceToEnergy';
import type {
  BaseMatrixValues,
  BirthDateInput,
  CalculationResult,
  CalculationStep,
  Energy,
  HealthCenterKey,
  HealthMapRow,
  HealthMapValues,
} from './types';

export type HealthMapInput = BaseMatrixValues | CalculationResult<BaseMatrixValues>;
export type HealthMapStepKey = HealthCenterKey | 'overallBalance';
export type HealthMapResult = CalculationResult<HealthMapValues>;

const FORMULA_VERSION = 'health-map-v1';

export function calculateHealthMap(input: HealthMapInput): HealthMapResult {
  const baseMatrix = getBaseMatrixValues(input);
  const steps: CalculationStep<HealthMapStepKey>[] = [];

  const rows: HealthMapRow[] = [
    createRow(steps, 'crown', 'Crown', baseMatrix.B, baseMatrix.V, 'reduceToEnergy(B + V)'),
    createRow(steps, 'vision', 'Vision', baseMatrix.B2, baseMatrix.V2, 'reduceToEnergy(B2 + V2)'),
    createRow(steps, 'voice', 'Voice', baseMatrix.B1, baseMatrix.V1, 'reduceToEnergy(B1 + V1)'),
    createRow(steps, 'heart', 'Heart', baseMatrix.D, baseMatrix.D, 'reduceToEnergy(D + D)'),
    createRow(steps, 'power', 'Power', baseMatrix.A, baseMatrix.A, 'reduceToEnergy(A + A)'),
    createRow(steps, 'creation', 'Creation', baseMatrix.G1, baseMatrix.D1, 'reduceToEnergy(G1 + D1)'),
    createRow(steps, 'root', 'Root', baseMatrix.G, baseMatrix.D, 'reduceToEnergy(G + D)'),
  ];

  const emotionalTotal = rows.reduce((sum, row) => sum + row.emotional, 0);
  const emotionalAverage = emotionalTotal / rows.length;
  const overallBalance = Math.round((emotionalAverage / 22) * 100);

  steps.push({
    key: 'overallBalance',
    formula: 'Math.round((averageEmotional / 22) * 100)',
    input: `${emotionalTotal} / ${rows.length}`,
    rawValue: emotionalAverage,
    value: overallBalance,
  });

  return {
    formulaVersion: FORMULA_VERSION,
    input: getResultInput(input),
    values: {
      rows,
      overallBalance,
    },
    steps,
  };
}

function createRow(
  steps: CalculationStep<HealthMapStepKey>[],
  key: HealthCenterKey,
  label: string,
  physical: Energy,
  energy: Energy,
  formula: string,
): HealthMapRow {
  const rawValue = physical + energy;
  const emotional = reduceToEnergy(rawValue);

  steps.push({
    key,
    formula,
    input: `${physical} + ${energy}`,
    rawValue,
    value: emotional,
  });

  return {
    key,
    label,
    physical,
    energy,
    emotional,
  };
}

function getBaseMatrixValues(input: HealthMapInput): BaseMatrixValues {
  if (isCalculationResult(input)) {
    return input.values;
  }

  return input;
}

function getResultInput(input: HealthMapInput): BirthDateInput {
  if (isCalculationResult(input)) {
    return input.input;
  }

  return {
    birthDate: 'base-matrix-values',
  };
}

function isCalculationResult(input: HealthMapInput): input is CalculationResult<BaseMatrixValues> {
  return 'values' in input && 'formulaVersion' in input && 'steps' in input;
}
