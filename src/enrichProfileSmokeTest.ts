import { calculateYearMapProfile } from './calculateYearMapProfile';
import { enrichProfile } from './enrichProfile';

const profile = calculateYearMapProfile({
  birthDate: { birthDate: '1998-06-15' },
  gender: 'female',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

const enrichedProfile = enrichProfile(profile);

assertGreaterThan('baseMatrix meanings length', enrichedProfile.meanings.baseMatrix.length, 0);
assertGreaterThan('yearMatrix meanings length', enrichedProfile.meanings.yearMatrix.length, 0);
assertGreaterThan('healthMap meanings length', enrichedProfile.meanings.healthMap.length, 0);
assertGreaterThan('monthEnergy meanings length', enrichedProfile.meanings.monthEnergy.length, 0);
assertGreaterThan('dayEnergy meanings length', enrichedProfile.meanings.dayEnergy.length, 0);
assertEqual('contains Balance', hasMeaningTitle(enrichedProfile, 'Balance'), true);
assertNoDuplicateArcana('baseMatrix', enrichedProfile.meanings.baseMatrix.map((meaning) => meaning.arcana));
assertNoDuplicateArcana('yearMatrix', enrichedProfile.meanings.yearMatrix.map((meaning) => meaning.arcana));
assertNoDuplicateArcana('healthMap', enrichedProfile.meanings.healthMap.map((meaning) => meaning.arcana));
assertNoDuplicateArcana('monthEnergy', enrichedProfile.meanings.monthEnergy.map((meaning) => meaning.arcana));
assertNoDuplicateArcana('dayEnergy', enrichedProfile.meanings.dayEnergy.map((meaning) => meaning.arcana));

function hasMeaningTitle(enriched: typeof enrichedProfile, title: string): boolean {
  return Object.values(enriched.meanings).some((section) => section.some((meaning) => meaning.title === title));
}

function assertGreaterThan(name: string, actual: number, minimum: number): void {
  if (actual <= minimum) {
    throw new Error(`${name} expected to be greater than ${minimum}, received ${actual}.`);
  }
}

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

function assertNoDuplicateArcana(name: string, arcana: number[]): void {
  const unique = new Set(arcana);

  if (unique.size !== arcana.length) {
    throw new Error(`${name} expected duplicate arcana to be removed.`);
  }
}

console.log('Profile enrichment smoke test passed.');
