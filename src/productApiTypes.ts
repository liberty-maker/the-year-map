import type { AiGuideContext, Gender, ReportData, YearMapProfileValues } from './types';

export type CreateYearMapRequest = {
  userName?: string;
  birthDate: string;
  gender?: Gender;
  targetYear: number;
  targetMonth: number;
  targetDate: string;
  locale?: string;
};

export type CreateYearMapResponse = {
  profile: YearMapProfileValues;
  aiGuideContext: AiGuideContext;
  reportData: ReportData;
};

export type CreateYearMapError = {
  code: string;
  message: string;
  field?: string;
};
