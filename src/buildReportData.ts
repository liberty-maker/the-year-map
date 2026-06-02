import { buildAiGuideContext } from './buildAiGuideContext';
import type { EnrichedYearMapProfile, ReportData, ReportSection } from './productApiTypes';

export function buildReportData(profile: EnrichedYearMapProfile): ReportData {
  const displayName = profile.input.fullName?.trim() || 'Your Year Map';
  const aiGuideContext = buildAiGuideContext(profile);

  return {
    title: `${displayName} — ${profile.input.targetYear} Year Map`,
    subtitle: `A deterministic profile based on ${profile.input.birthDate}.`,
    input: profile.input,
    sections: [
      buildMatrixSection(profile),
      buildYearSection(profile),
      buildHealthSection(profile),
      buildMonthSection(profile),
    ],
    aiGuideContext,
  };
}

function buildMatrixSection(profile: EnrichedYearMapProfile): ReportSection {
  return {
    key: 'matrix',
    title: 'Personal Matrix',
    items: ['A', 'B', 'V', 'G', 'D', 'M'].map((key) => `${key}: ${profile.matrix.values[key as keyof typeof profile.matrix.values]} — ${profile.matrixArcana[key].title}`),
  };
}

function buildYearSection(profile: EnrichedYearMapProfile): ReportSection {
  return {
    key: 'yearMatrix',
    title: 'Year Matrix',
    items: ['A_Year', 'B_Year', 'V_Year', 'G_Year', 'D_Year', 'M_Year'].map((key) => `${key}: ${profile.yearMatrix.values[key as keyof typeof profile.yearMatrix.values]} — ${profile.yearMatrixArcana[key].title}`),
  };
}

function buildHealthSection(profile: EnrichedYearMapProfile): ReportSection {
  return {
    key: 'healthMap',
    title: 'Health Map',
    items: profile.healthMap.zones.map((zone) => `${zone.label}: ${zone.balanceScore} — ${zone.arcana.title}. ${zone.guidance}`),
  };
}

function buildMonthSection(profile: EnrichedYearMapProfile): ReportSection {
  return {
    key: 'months',
    title: 'Month Energy',
    items: profile.months.map((month) => `${month.label}: ${month.energy} — ${month.arcana.title}`),
  };
}
