export type Energy = number;

export type Gender = 'female' | 'male' | 'child' | 'unspecified';

export type SupportedLocale = 'en' | 'ru' | 'uk' | 'ar';

export type LocalizedStringMap = Record<SupportedLocale, string>;

export type BirthDateInput = {
  birthDate: string;
  fullName?: string;
  gender?: Gender;
};

export type CalculationStep<TKey extends string = string> = {
  key: TKey;
  formula: string;
  input: string;
  rawValue: number;
  value: number;
};

export type BaseMatrixValues = {
  A: Energy;
  B: Energy;
  V: Energy;
  G: Energy;
  D: Energy;
  A1: Energy;
  A2: Energy;
  B1: Energy;
  B2: Energy;
  V1: Energy;
  V2: Energy;
  G1: Energy;
  G2: Energy;
  E: Energy;
  Yo: Energy;
  Zh: Energy;
  Z: Energy;
  D1: Energy;
  K: Energy;
  L: Energy;
  M: Energy;
};

export type YearMatrixValues = {
  DayCode: Energy;
  YearCode: Energy;
  MonthCode: Energy;
  A_Year: Energy;
  B_Year: Energy;
  V_Year: Energy;
  G_Year: Energy;
  D_Year: Energy;
  E_Year: Energy;
  Yo_Year: Energy;
  Zh_Year: Energy;
  Z_Year: Energy;
  K_Year: Energy;
  L_Year: Energy;
  M_Year: Energy;
};

export type HealthCenterKey = 'crown' | 'vision' | 'voice' | 'heart' | 'power' | 'creation' | 'root';

export type HealthMapRow = {
  key: HealthCenterKey;
  label: string;
  physical: Energy;
  energy: Energy;
  emotional: Energy;
};

export type HealthMapValues = {
  rows: HealthMapRow[];
  overallBalance: number;
};

export type MonthEnergyValues = {
  targetYear: number;
  targetMonth: number;
  daysInMonth: number;
  A_Month: Energy;
  B_Month: Energy;
  G_Month: Energy;
  D_Month: Energy;
};

export type DayEnergyValues = {
  targetDate: string;
  A_Day: Energy;
  B_Day: Energy;
  G_Day: Energy;
  D_Day: Energy;
};

export type YearMapProfileInput = {
  birthDate: BirthDateInput;
  gender?: Gender;
  targetYear: number;
  targetMonth: number;
  targetDate: string;
};

export type YearMapProfileValues = {
  birthDate: string;
  gender: Gender;
  targetYear: number;
  targetMonth: number;
  targetDate: string;
  baseMatrix: BaseMatrixValues;
  yearMatrix: YearMatrixValues;
  healthMap: HealthMapValues;
  monthEnergy: MonthEnergyValues;
  dayEnergy: DayEnergyValues;
};


export type AiGuideContextInput = {
  userName?: string;
  profile: YearMapProfileValues;
};

export type AiGuideSection = {
  title: string;
  summary: string;
  arcana: number[];
};

export type AiGuideContext = {
  userName?: string;
  disclaimer: string;
  focus: {
    today: number;
    month: number;
    year: number;
    core: number;
  };
  sections: {
    identity: AiGuideSection;
    year: AiGuideSection;
    health: AiGuideSection;
    month: AiGuideSection;
    day: AiGuideSection;
  };
  suggestedQuestions: string[];
};


export type ReportSection = {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  arcana: number[];
};

export type ReportData = {
  title: string;
  subtitle: string;
  userName?: string;
  generatedFor: {
    birthDate: BirthDateInput;
    gender: Gender;
    targetYear: number;
    targetMonth: number;
    targetDate: string;
  };
  disclaimer: string;
  sections: ReportSection[];
};

export type CalculationResult<TValues, TInput = BirthDateInput> = {
  formulaVersion: string;
  input: TInput;
  values: TValues;
  steps: CalculationStep[];
};
