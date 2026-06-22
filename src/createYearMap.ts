import { calculateYearMapProfile } from './calculateYearMapProfile';
import { enrichProfile } from './enrichProfile';
import { buildAiGuideContext } from './buildAiGuideContext';
import { buildReportData } from './buildReportData';
import { normalizeLocale, getTextDirection } from './i18n';
import { getEntitlements, getPlanDefinition } from './plans';
import type { YearMapInput, YearMapResult } from './productApiTypes';

export function createYearMap(input: YearMapInput): YearMapResult {
  const locale = normalizeLocale(input.locale);
  const direction = getTextDirection(locale);
  const plan = getPlanDefinition(input.planId);
  const entitlements = getEntitlements(plan.id);
  const profile = calculateYearMapProfile(input);
  const enrichedProfile = enrichProfile(profile);
  const aiGuideContext = buildAiGuideContext(enrichedProfile);
  const reportData = buildReportData(enrichedProfile);

  return {
    locale,
    direction,
    plan,
    entitlements,
    profile,
    enrichedProfile,
    aiGuideContext,
    reportData,
  };
}
