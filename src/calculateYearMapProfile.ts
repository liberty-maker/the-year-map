import { calculateMatrix } from './calculateMatrix';
import { calculateYearMatrix } from './calculateYearMatrix';
import { calculateHealthMap } from './calculateHealthMap';
import { calculateYearMonths } from './calculateMonthEnergy';
import type { YearMapInput, YearMapProfile } from './productApiTypes';

const FORMULA_VERSION = '1.0.0';

export function calculateYearMapProfile(input: YearMapInput): YearMapProfile {
  const matrix = calculateMatrix({ birthDate: input.birthDate, fullName: input.fullName });
  const yearMatrix = calculateYearMatrix({ birthDate: input.birthDate, targetYear: input.targetYear, fullName: input.fullName });
  const healthMap = calculateHealthMap({ matrix, yearMatrix });
  const months = calculateYearMonths(input.targetYear, yearMatrix);

  return {
    formulaVersion: FORMULA_VERSION,
    input: {
      ...input,
      birthDate: matrix.input.birthDate,
      targetYear: yearMatrix.input.targetYear,
    },
    matrix,
    yearMatrix,
    healthMap,
    months,
  };
}
