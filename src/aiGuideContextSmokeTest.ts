import { buildAiGuideContext } from './buildAiGuideContext';
import { calculateYearMapProfile } from './calculateYearMapProfile';

const profile = calculateYearMapProfile({
  birthDate: { birthDate: '1998-06-15' },
  gender: 'female',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

const context = buildAiGuideContext({
  userName: 'Anna',
  profile: profile.values,
});

assertEqual('userName', context.userName, 'Anna');
assertEqual('focus.today', context.focus.today, 11);
assertEqual('focus.month', context.focus.month, 3);
assertEqual('focus.year', context.focus.year, 8);
assertEqual('focus.core', context.focus.core, 6);
assertEqual('identity arcana length', context.sections.identity.arcana.length, 5);
assertEqual('year arcana length', context.sections.year.arcana.length, 5);
assertEqual('health arcana length', context.sections.health.arcana.length, 7);
assertEqual('suggested questions length', context.suggestedQuestions.length, 6);
assertEqual('disclaimer includes symbolic', context.disclaimer.includes('symbolic'), true);
assertEqual('disclaimer includes not medical', context.disclaimer.includes('not medical'), true);

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('AI Guide context smoke test passed.');
