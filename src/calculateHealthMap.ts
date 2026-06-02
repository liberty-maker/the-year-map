import type { MatrixResult } from './calculateMatrix';
import type { YearMatrixResult } from './calculateYearMatrix';
import type { EnergyReference, HealthMapResult, HealthMapZone } from './productApiTypes';

const FORMULA_VERSION = '1.0.0';

export type HealthMapInput = {
  matrix: MatrixResult;
  yearMatrix?: YearMatrixResult;
};

export function calculateHealthMap(input: HealthMapInput): HealthMapResult {
  const zones: HealthMapZone[] = [
    createZone('body', 'Body and stamina', input.matrix.values.A, [
      reference('A', input.matrix.values.A, 'Personal body point'),
      reference('B', input.matrix.values.B, 'Personal resource point'),
      reference('A_Year', input.yearMatrix?.values.A_Year, 'Year body point'),
    ]),
    createZone('heart', 'Heart and relationships', input.matrix.values.E, [
      reference('E', input.matrix.values.E, 'Personal relationship point'),
      reference('Yo', input.matrix.values.Yo, 'Personal partnership point'),
      reference('E_Year', input.yearMatrix?.values.E_Year, 'Year relationship point'),
    ]),
    createZone('mind', 'Mind and decisions', input.matrix.values.V, [
      reference('V', input.matrix.values.V, 'Personal mental point'),
      reference('Zh', input.matrix.values.Zh, 'Personal integration point'),
      reference('V_Year', input.yearMatrix?.values.V_Year, 'Year mental point'),
    ]),
    createZone('purpose', 'Purpose and recovery', input.matrix.values.D, [
      reference('D', input.matrix.values.D, 'Personal center point'),
      reference('M', input.matrix.values.M, 'Personal synthesis point'),
      reference('D_Year', input.yearMatrix?.values.D_Year, 'Year center point'),
      reference('M_Year', input.yearMatrix?.values.M_Year, 'Year synthesis point'),
    ]),
  ];

  return {
    formulaVersion: FORMULA_VERSION,
    zones,
    summaryEnergy: reduceToEnergy(zones.reduce((sum, zone) => sum + zone.balanceScore, 0)),
  };
}

function createZone(key: string, label: string, primaryEnergy: number, source: Array<EnergyReference | undefined>): HealthMapZone {
  const supportingEnergies = source.filter((item): item is EnergyReference => item !== undefined);
  const balanceScore = reduceToEnergy(supportingEnergies.reduce((sum, item) => sum + item.value, 0));

  return {
    key,
    label,
    primaryEnergy,
    supportingEnergies,
    balanceScore,
    guidance: buildGuidance(label, balanceScore),
  };
}

function reference(key: string, value: number | undefined, label: string): EnergyReference | undefined {
  return value === undefined ? undefined : { key, value, label };
}

function buildGuidance(label: string, balanceScore: number): string {
  if (balanceScore <= 7) {
    return `${label} benefits from simple routines and low-friction consistency.`;
  }

  if (balanceScore <= 14) {
    return `${label} is in an integration range; balance effort with recovery.`;
  }

  return `${label} carries high activation; channel intensity into clear priorities.`;
}

function reduceToEnergy(value: number): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('Energy source value must be a positive integer.');
  }

  let result = value;
  while (result > 22) {
    result = String(result).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }

  return result;
}
