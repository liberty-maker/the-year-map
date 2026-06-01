import { buildAiGuideContext } from './buildAiGuideContext';
import { calculateYearMapProfile } from './calculateYearMapProfile';

const profile = calculateYearMapProfile({
  birthDate: { birthDate: '1998-06-15' },
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

const aiGuideContext = buildAiGuideContext({ profile: profile.values });

console.log(JSON.stringify({ aiGuideContext }, null, 2));
