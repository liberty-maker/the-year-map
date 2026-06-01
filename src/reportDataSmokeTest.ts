import { buildReportData } from './buildReportData';
import { calculateYearMapProfile } from './calculateYearMapProfile';

const profile = calculateYearMapProfile({
  birthDate: { birthDate: '1998-06-15' },
  gender: 'female',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

const report = buildReportData({
  userName: 'Anna',
  profile: profile.values,
});

assertEqual('title', report.title, 'The Year Map Report');
assertEqual('userName', report.userName, 'Anna');
assertEqual('sections length', report.sections.length, 7);
assertEqual('first section id', report.sections[0].id, 'overview');
assertEqual('last section id', report.sections[report.sections.length - 1].id, 'reflection-questions');
assertEqual('overview arcana length', report.sections[0].arcana.length, 4);
assertEqual('disclaimer includes symbolic', report.disclaimer.includes('symbolic'), true);
assertEqual('disclaimer includes not medical', report.disclaimer.includes('not medical'), true);
assertEqual('reflection questions are numbered', report.sections[6].body.includes('1.'), true);
assertEqual('contains core pattern section', report.sections.some((section) => section.title === 'Core Pattern' || section.body.includes('Your Core Pattern')), true);

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Report data smoke test passed.');
