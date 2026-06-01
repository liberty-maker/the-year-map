import { buildAiGuideContext } from './buildAiGuideContext';
import { buildReportData } from './buildReportData';
import { calculateYearMapProfile } from './calculateYearMapProfile';
import type { CreateYearMapRequest, CreateYearMapResponse } from './productApiTypes';

export function createYearMap(request: CreateYearMapRequest): CreateYearMapResponse {
  const profileResult = calculateYearMapProfile({
    birthDate: { birthDate: request.birthDate },
    gender: request.gender,
    targetYear: request.targetYear,
    targetMonth: request.targetMonth,
    targetDate: request.targetDate,
  });
  const profile = profileResult.values;
  const aiGuideContext = buildAiGuideContext({
    userName: request.userName,
    profile,
  });
  const reportData = buildReportData({
    userName: request.userName,
    profile,
  });

  return {
    profile,
    aiGuideContext,
    reportData,
  };
}
