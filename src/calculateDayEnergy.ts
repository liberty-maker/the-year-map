import type { DayEnergy, MonthEnergy } from './productApiTypes';
import { calculateMonthEnergy, reduceToEnergy } from './calculateMonthEnergy';

export type DayEnergyInput = {
  date: string;
  monthEnergy?: MonthEnergy;
};

export function calculateDayEnergy(input: DayEnergyInput): DayEnergy {
  const { date, year, month, day } = parseDate(input.date);
  const monthEnergy = input.monthEnergy ?? calculateMonthEnergy({ targetYear: year, month });

  return {
    date,
    dayOfMonth: day,
    energy: reduceToEnergy(monthEnergy.energy + day),
    source: [
      { key: 'monthEnergy', value: monthEnergy.energy, label: `${monthEnergy.label} energy` },
      { key: 'dayOfMonth', value: day, label: 'Calendar day of month' },
    ],
  };
}

function parseDate(date: string): { date: string; year: number; month: number; day: number } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('date must use YYYY-MM-DD format.');
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error('date must be a valid calendar date.');
  }

  const [year, month, day] = date.split('-').map(Number);
  return { date, year, month, day };
}
