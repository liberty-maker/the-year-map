import type { MatrixResult } from './calculateMatrix';
import type { YearMatrixResult } from './calculateYearMatrix';
import type { ArcanaMeaning } from './arcanaDictionary';
import type { PlanDefinition, EntitlementResult, PlanId } from './plans';
import type { SupportedLocale, TextDirection } from './i18n';

export type YearMapInput = {
  birthDate: string;
  targetYear: number;
  fullName?: string;
  locale?: string;
  planId?: PlanId | string;
};

export type EnergyValue = number;

export type EnergyReference = {
  key: string;
  value: EnergyValue;
  label: string;
};

export type HealthMapZone = {
  key: string;
  label: string;
  primaryEnergy: EnergyValue;
  supportingEnergies: EnergyReference[];
  balanceScore: EnergyValue;
  guidance: string;
};

export type HealthMapResult = {
  formulaVersion: string;
  zones: HealthMapZone[];
  summaryEnergy: EnergyValue;
};

export type MonthEnergy = {
  month: number;
  label: string;
  energy: EnergyValue;
  source: EnergyReference[];
};

export type DayEnergy = {
  date: string;
  dayOfMonth: number;
  energy: EnergyValue;
  source: EnergyReference[];
};

export type YearMapProfile = {
  formulaVersion: string;
  input: YearMapInput;
  matrix: MatrixResult;
  yearMatrix: YearMatrixResult;
  healthMap: HealthMapResult;
  months: MonthEnergy[];
};

export type EnrichedEnergyReference = EnergyReference & {
  arcana: ArcanaMeaning;
};

export type EnrichedHealthMapZone = Omit<HealthMapZone, 'supportingEnergies'> & {
  arcana: ArcanaMeaning;
  supportingEnergies: EnrichedEnergyReference[];
};

export type EnrichedMonthEnergy = MonthEnergy & {
  arcana: ArcanaMeaning;
};

export type EnrichedYearMapProfile = Omit<YearMapProfile, 'healthMap' | 'months'> & {
  healthMap: Omit<HealthMapResult, 'zones'> & {
    arcana: ArcanaMeaning;
    zones: EnrichedHealthMapZone[];
  };
  months: EnrichedMonthEnergy[];
  matrixArcana: Record<string, ArcanaMeaning>;
  yearMatrixArcana: Record<string, ArcanaMeaning>;
};

export type AiGuideContext = {
  version: string;
  subject: {
    fullName?: string;
    birthDate: string;
    targetYear: number;
  };
  dominantEnergies: EnrichedEnergyReference[];
  yearlyThemes: EnrichedEnergyReference[];
  healthThemes: EnrichedHealthMapZone[];
  monthThemes: EnrichedMonthEnergy[];
  guardrails: string[];
};

export type ReportSection = {
  key: string;
  title: string;
  items: string[];
};

export type ReportData = {
  title: string;
  subtitle: string;
  input: YearMapInput;
  sections: ReportSection[];
  aiGuideContext: AiGuideContext;
};

export type YearMapResult = {
  locale: SupportedLocale;
  direction: TextDirection;
  plan: PlanDefinition;
  entitlements: EntitlementResult;
  profile: YearMapProfile;
  enrichedProfile: EnrichedYearMapProfile;
  aiGuideContext: AiGuideContext;
  reportData: ReportData;
};
