import { calculateYearMapProfile } from './calculateYearMapProfile';
import { enrichProfile } from './enrichProfile';
import { buildAiGuideContext } from './buildAiGuideContext';
import { buildReportData } from './buildReportData';
import type { YearMapInput, YearMapResult } from './productApiTypes';

export function createYearMap(input: YearMapInput): YearMapResult {
  const profile = calculateYearMapProfile(input);
  const enrichedProfile = enrichProfile(profile);
  const aiGuideContext = buildAiGuideContext(enrichedProfile);
  const reportData = buildReportData(enrichedProfile);

  return {
    profile,
    enrichedProfile,
    aiGuideContext,
    reportData,
  };
}
