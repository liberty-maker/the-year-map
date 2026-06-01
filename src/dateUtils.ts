import type { BirthDateInput } from './types';

export function isLeapYear(year: number): boolean {
  validateTargetYear(year);

  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getDaysInMonth(year: number, month: number): number {
  validateTargetYear(year);
  validateTargetMonth(month);

  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

export function parseBirthDate(input: BirthDateInput): { day: number; month: number; year: number } {
  const { year, month, day } = parseDateString(input.birthDate, 'birthDate');

  return { day, month, year };
}

export function validateTargetYear(year: number): void {
  if (!Number.isInteger(year) || year < 1) {
    throw new Error('targetYear must be a positive integer.');
  }
}

export function validateTargetMonth(month: number): void {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error('targetMonth must be an integer from 1 to 12.');
  }
}

export function validateTargetDay(year: number, month: number, day: number): void {
  validateTargetYear(year);
  validateTargetMonth(month);

  const daysInMonth = getDaysInMonth(year, month);

  if (!Number.isInteger(day) || day < 1 || day > daysInMonth) {
    throw new Error(`targetDay must be an integer from 1 to ${daysInMonth}.`);
  }
}

export function parseDateString(value: string, fieldName: string): { year: number; month: number; day: number } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${fieldName} must use YYYY-MM-DD format.`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`${fieldName} must be a valid calendar date.`);
  }

  const [year, month, day] = value.split('-').map(Number);

  return { year, month, day };
}
