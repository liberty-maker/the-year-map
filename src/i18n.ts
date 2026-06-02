import type { SupportedLocale } from './types';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ru', 'uk', 'ar'];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function normalizeLocale(input?: string): SupportedLocale {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const normalizedInput = input.toLowerCase();
  const baseLocale = normalizedInput.split('-')[0];

  if (isSupportedLocale(normalizedInput)) {
    return normalizedInput;
  }

  if (isSupportedLocale(baseLocale)) {
    return baseLocale;
  }

  return DEFAULT_LOCALE;
}

export function isRtlLocale(locale: SupportedLocale): boolean {
  return locale === 'ar';
}

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}
