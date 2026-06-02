import type { YearMatrixResult } from './calculateYearMatrix';
import type { EnergyReference, MonthEnergy } from './productApiTypes';

export type MonthEnergyInput = {
  targetYear: number;
  month: number;
  yearMatrix?: YearMatrixResult;
};

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function calculateMonthEnergy(input: MonthEnergyInput): MonthEnergy {
  const month = normalizeMonth(input.month);
  const yearSeed = input.yearMatrix?.values.YearCode ?? reduceToEnergy(sumDigits(String(normalizeTargetYear(input.targetYear))));
  const monthCode = input.yearMatrix?.values.MonthCode ?? yearSeed + 12;

  const source: EnergyReference[] = [
    { key: 'YearCode', value: yearSeed, label: 'Target year energy' },
    { key: 'MonthCode', value: monthCode, label: 'Target year month code' },
    { key: 'month', value: month, label: 'Calendar month' },
  ];

  return {
    month,
    label: MONTH_LABELS[month - 1],
    energy: reduceToEnergy(yearSeed + monthCode + month),
    source,
  };
}

export function calculateYearMonths(targetYear: number, yearMatrix?: YearMatrixResult): MonthEnergy[] {
  return Array.from({ length: 12 }, (_, index) => calculateMonthEnergy({ targetYear, month: index + 1, yearMatrix }));
}

export function reduceToEnergy(value: number): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('Energy source value must be a positive integer.');
  }

  let result = value;
  while (result > 22) {
    result = sumDigits(String(result));
  }

  return result;
}

function normalizeMonth(month: number): number {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error('month must be an integer from 1 to 12.');
  }

  return month;
}

function normalizeTargetYear(targetYear: number): number {
  if (!Number.isInteger(targetYear) || targetYear < 1) {
    throw new Error('targetYear must be a positive integer.');
  }

  return targetYear;
}

function sumDigits(value: string): number {
  return value.split('').reduce((sum, digit) => sum + Number(digit), 0);
}
