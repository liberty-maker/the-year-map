import { isRtlLocale, normalizeLocale } from './i18n';

assertEqual('default locale', normalizeLocale(undefined), 'en');
assertEqual('en-GB locale', normalizeLocale('en-GB'), 'en');
assertEqual('EN-us locale', normalizeLocale('EN-us'), 'en');
assertEqual('ru-RU locale', normalizeLocale('ru-RU'), 'ru');
assertEqual('uk-UA locale', normalizeLocale('uk-UA'), 'uk');
assertEqual('ar-JO locale', normalizeLocale('ar-JO'), 'ar');
assertEqual('unknown locale', normalizeLocale('fr-FR'), 'en');
assertEqual('Arabic direction', isRtlLocale('ar'), true);
assertEqual('English direction', isRtlLocale('en'), false);

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('i18n smoke test passed.');
