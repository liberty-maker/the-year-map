import assert from 'node:assert/strict';
import { normalizeLocale, getTextDirection } from '../src/i18n';
import { canAccessFeature, getEntitlements, getPlanDefinition } from '../src/plans';
import { createYearMap } from '../src/createYearMap';

assert.equal(normalizeLocale(), 'en', 'missing locale defaults to English');
assert.equal(normalizeLocale('en-GB'), 'en', 'English region locale normalizes to en');
assert.equal(normalizeLocale('ru-RU'), 'ru', 'Russian region locale normalizes to ru');
assert.equal(normalizeLocale('uk-UA'), 'uk', 'Ukrainian region locale normalizes to uk');
assert.equal(normalizeLocale('ar-JO'), 'ar', 'Arabic region locale normalizes to ar');
assert.equal(normalizeLocale('pl-PL'), 'en', 'unsupported locale defaults to en');
assert.equal(getTextDirection('ar'), 'rtl', 'Arabic uses RTL direction');
assert.equal(getTextDirection('en'), 'ltr', 'English uses LTR direction');

assert.equal(getPlanDefinition('premium').priceGbp, 12, 'premium plan has expected GBP price');
assert.equal(getPlanDefinition('report').billing, 'one_time', 'report plan is one-time');
assert.equal(getPlanDefinition('unknown').id, 'free', 'unknown plan defaults to free');

assert.equal(canAccessFeature('free', 'baseMatrix'), true, 'free plan can access base matrix');
assert.equal(canAccessFeature('free', 'pdfReport'), false, 'free plan cannot access PDF report');
assert.equal(canAccessFeature('report', 'pdfReport'), true, 'report plan can access PDF report');
assert.equal(canAccessFeature('premium', 'aiGuide'), true, 'premium plan can access AI guide');
assert.equal(canAccessFeature('pro', 'clientMode'), true, 'pro plan can access client mode');

const proEntitlements = getEntitlements('pro');
assert.equal(Object.values(proEntitlements.features).every(Boolean), true, 'pro plan can access every feature');

const yearMap = createYearMap({
  fullName: 'Access Smoke Test',
  birthDate: '1990-04-12',
  targetYear: 2026,
  locale: 'ar-JO',
  planId: 'premium',
});

assert.equal(yearMap.locale, 'ar', 'createYearMap returns normalized locale');
assert.equal(yearMap.direction, 'rtl', 'createYearMap returns locale direction');
assert.equal(yearMap.plan.id, 'premium', 'createYearMap returns selected plan');
assert.equal(yearMap.entitlements.features.aiGuide, true, 'createYearMap returns entitlement metadata');
assert.equal(yearMap.reportData.sections.length, 4, 'createYearMap still returns report data');

console.log('access foundation smoke tests passed');
