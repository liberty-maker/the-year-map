import { calculateDayEnergy } from './calculateDayEnergy';
import { calculateMonthEnergy } from './calculateMonthEnergy';

const birthDate = { birthDate: '1998-06-15' };

const monthEnergy = calculateMonthEnergy({
  birthDate,
  targetYear: 2026,
  targetMonth: 6,
});

const expectedMonthEnergyValues = {
  targetYear: 2026,
  targetMonth: 6,
  daysInMonth: 30,
  A_Month: 6,
  B_Month: 9,
  G_Month: 15,
  D_Month: 3,
};

const dayEnergy = calculateDayEnergy({
  birthDate,
  targetDate: '2026-06-01',
});

const expectedDayEnergyValues = {
  targetDate: '2026-06-01',
  A_Day: 16,
  B_Day: 12,
  G_Day: 10,
  D_Day: 11,
};

assertValues('calculateMonthEnergy', monthEnergy.values, expectedMonthEnergyValues);
assertValues('calculateDayEnergy', dayEnergy.values, expectedDayEnergyValues);
assertEqual('month energy formulaVersion', monthEnergy.formulaVersion, 'month-energy-v1');
assertEqual('day energy formulaVersion', dayEnergy.formulaVersion, 'day-energy-v1');
assertEqual('month energy step count', monthEnergy.steps.length, 5);
assertEqual('day energy step count', dayEnergy.steps.length, 4);

function assertValues(name: string, actual: Record<string, unknown>, expected: Record<string, unknown>): void {
  for (const [key, expectedValue] of Object.entries(expected)) {
    assertEqual(`${name}.${key}`, actual[key], expectedValue);
  }
}

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Time energy smoke test passed.');
