import { calculateYearMapProfile } from './calculateYearMapProfile';

const profile = calculateYearMapProfile({
  birthDate: { birthDate: '1998-06-15' },
  gender: 'female',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

assertEqual('formulaVersion', profile.formulaVersion, 'year-map-profile-v1');
assertEqual('gender', profile.values.gender, 'female');
assertEqual('baseMatrix D', profile.values.baseMatrix.D, 6);
assertEqual('yearMatrix D_Year', profile.values.yearMatrix.D_Year, 8);
assertEqual('healthMap overallBalance', profile.values.healthMap.overallBalance, 49);
assertEqual('monthEnergy D_Month', profile.values.monthEnergy.D_Month, 3);
assertEqual('dayEnergy D_Day', profile.values.dayEnergy.D_Day, 11);
assertEqual('steps length', profile.steps.length, 5);

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Profile smoke test passed.');
