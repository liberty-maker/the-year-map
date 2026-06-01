import { createYearMap } from './createYearMap';

const response = createYearMap({
  userName: 'Anna',
  birthDate: '1998-06-15',
  gender: 'female',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
  locale: 'en',
});

assertEqual('profile birthDate', response.profile.birthDate, '1998-06-15');
assertEqual('profile gender', response.profile.gender, 'female');
assertEqual('baseMatrix D', response.profile.baseMatrix.D, 6);
assertEqual('yearMatrix D_Year', response.profile.yearMatrix.D_Year, 8);
assertEqual('healthMap overallBalance', response.profile.healthMap.overallBalance, 49);
assertEqual('aiGuideContext focus today', response.aiGuideContext.focus.today, 11);
assertEqual('reportData title', response.reportData.title, 'The Year Map Report');
assertEqual('reportData section count', response.reportData.sections.length, 7);

const defaultGenderResponse = createYearMap({
  birthDate: '1998-06-15',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

assertEqual('default gender', defaultGenderResponse.profile.gender, 'unspecified');

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Create Year Map smoke test passed.');
