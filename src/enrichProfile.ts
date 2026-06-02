import { getArcanaMeaning } from './arcanaDictionary';
import type { EnergyReference, EnrichedEnergyReference, EnrichedYearMapProfile, YearMapProfile } from './productApiTypes';

export function enrichProfile(profile: YearMapProfile): EnrichedYearMapProfile {
  return {
    ...profile,
    matrixArcana: mapValueRecord(profile.matrix.values),
    yearMatrixArcana: mapValueRecord(profile.yearMatrix.values),
    healthMap: {
      ...profile.healthMap,
      arcana: getArcanaMeaning(profile.healthMap.summaryEnergy),
      zones: profile.healthMap.zones.map((zone) => ({
        ...zone,
        arcana: getArcanaMeaning(zone.balanceScore),
        supportingEnergies: zone.supportingEnergies.map(enrichEnergyReference),
      })),
    },
    months: profile.months.map((month) => ({
      ...month,
      arcana: getArcanaMeaning(month.energy),
    })),
  };
}

function enrichEnergyReference(reference: EnergyReference): EnrichedEnergyReference {
  return {
    ...reference,
    arcana: getArcanaMeaning(reference.value),
  };
}

function mapValueRecord(values: Record<string, number>) {
  return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, getArcanaMeaning(value)]));
}
