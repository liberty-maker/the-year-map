import type { AiGuideContext, Gender, ReportData, SupportedLocale, YearMapProfileValues } from './types';

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
  locale: SupportedLocale;
  direction: 'ltr' | 'rtl';
  profile: YearMapProfileValues;
  aiGuideContext: AiGuideContext;
  reportData: ReportData;
};

export type CreateYearMapError = {
  code: string;
  message: string;
  field?: string;
};
