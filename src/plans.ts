export type PlanId = 'free' | 'report' | 'premium' | 'pro';

export type FeatureKey =
  | 'baseMatrix'
  | 'yearMatrix'
  | 'healthMap'
  | 'monthEnergy'
  | 'dayEnergy'
  | 'aiGuide'
  | 'pdfReport'
  | 'clientMode'
  | 'advancedReports';

export type PlanDefinition = {
  id: PlanId;
  name: string;
  priceGbp: number;
  billing: 'free' | 'one_time' | 'monthly';
  audience: string;
  description: string;
  includedFeatures: FeatureKey[];
};

export type EntitlementResult = {
  planId: PlanId;
  features: Record<FeatureKey, boolean>;
};

export const FEATURE_KEYS: FeatureKey[] = [
  'baseMatrix',
  'yearMatrix',
  'healthMap',
  'monthEnergy',
  'dayEnergy',
  'aiGuide',
  'pdfReport',
  'clientMode',
  'advancedReports',
];

export const PLAN_DEFINITIONS: Record<PlanId, PlanDefinition> = {
  free: {
    id: 'free',
    name: 'Free',
    priceGbp: 0,
    billing: 'free',
    audience: 'Curious users starting with self-discovery.',
    description: 'Basic personal and year overview with limited interpretation.',
    includedFeatures: ['baseMatrix', 'yearMatrix', 'monthEnergy'],
  },
  report: {
    id: 'report',
    name: 'Report',
    priceGbp: 9,
    billing: 'one_time',
    audience: 'Users who want a clear written Year Map report.',
    description: 'One-time report access with health map and PDF-ready report data.',
    includedFeatures: ['baseMatrix', 'yearMatrix', 'healthMap', 'monthEnergy', 'dayEnergy', 'pdfReport'],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    priceGbp: 12,
    billing: 'monthly',
    audience: 'Users who want ongoing guided reflection.',
    description: 'Full self-discovery flow with AI guide context and time-energy layers.',
    includedFeatures: ['baseMatrix', 'yearMatrix', 'healthMap', 'monthEnergy', 'dayEnergy', 'aiGuide', 'pdfReport'],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    priceGbp: 29,
    billing: 'monthly',
    audience: 'Practitioners and consultants working with clients.',
    description: 'Professional mode with client workflows and advanced report surfaces.',
    includedFeatures: [
      'baseMatrix',
      'yearMatrix',
      'healthMap',
      'monthEnergy',
      'dayEnergy',
      'aiGuide',
      'pdfReport',
      'clientMode',
      'advancedReports',
    ],
  },
};

export function normalizePlanId(input?: string): PlanId {
  if (input && isPlanId(input)) {
    return input;
  }

  return 'free';
}

export function getPlanDefinition(input?: string): PlanDefinition {
  return PLAN_DEFINITIONS[normalizePlanId(input)];
}

export function getEntitlements(input?: string): EntitlementResult {
  const plan = getPlanDefinition(input);
  const features = Object.fromEntries(
    FEATURE_KEYS.map((feature) => [feature, plan.includedFeatures.includes(feature)]),
  ) as Record<FeatureKey, boolean>;

  return {
    planId: plan.id,
    features,
  };
}

export function canAccessFeature(planId: PlanId | string | undefined, feature: FeatureKey): boolean {
  return getEntitlements(planId).features[feature];
}

function isPlanId(value: string): value is PlanId {
  return Object.prototype.hasOwnProperty.call(PLAN_DEFINITIONS, value);
}
