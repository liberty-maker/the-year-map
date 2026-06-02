import type { AiGuideContext, EnrichedEnergyReference, EnrichedYearMapProfile } from './productApiTypes';

export function buildAiGuideContext(profile: EnrichedYearMapProfile): AiGuideContext {
  return {
    version: profile.formulaVersion,
    subject: {
      fullName: profile.input.fullName,
      birthDate: profile.input.birthDate,
      targetYear: profile.input.targetYear,
    },
    dominantEnergies: pickDominantMatrixEnergies(profile),
    yearlyThemes: pickYearlyThemes(profile),
    healthThemes: profile.healthMap.zones,
    monthThemes: profile.months,
    guardrails: [
      'Use the data as reflective guidance, not medical, legal, or financial advice.',
      'Ground every interpretation in the supplied deterministic energies.',
      'Avoid predictions that remove user agency.',
    ],
  };
}

function pickDominantMatrixEnergies(profile: EnrichedYearMapProfile): EnrichedEnergyReference[] {
  return ['A', 'B', 'V', 'G', 'D', 'M'].map((key) => ({
    key,
    value: profile.matrix.values[key as keyof typeof profile.matrix.values],
    label: `Personal matrix ${key}`,
    arcana: profile.matrixArcana[key],
  }));
}

function pickYearlyThemes(profile: EnrichedYearMapProfile): EnrichedEnergyReference[] {
  return ['A_Year', 'B_Year', 'V_Year', 'G_Year', 'D_Year', 'M_Year'].map((key) => ({
    key,
    value: profile.yearMatrix.values[key as keyof typeof profile.yearMatrix.values],
    label: `Year matrix ${key}`,
    arcana: profile.yearMatrixArcana[key],
  }));
}
