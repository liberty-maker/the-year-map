export type SupportedLocale = 'en' | 'ru' | 'uk' | 'ar';
export type TextDirection = 'ltr' | 'rtl';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'ru', 'uk', 'ar'];
export const DEFAULT_LOCALE: SupportedLocale = 'en';

export function normalizeLocale(input?: string): SupportedLocale {
  if (!input) {
    return DEFAULT_LOCALE;
  }

  const base = input.toLowerCase().split('-')[0];
  if (isSupportedLocale(base)) {
    return base;
  }

  return DEFAULT_LOCALE;
}

export function getTextDirection(locale: SupportedLocale): TextDirection {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale);
}
