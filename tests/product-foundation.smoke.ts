import assert from 'node:assert/strict';
import { ARCANA_DICTIONARY, getArcanaMeaning } from '../src/arcanaDictionary';
import { calculateDayEnergy } from '../src/calculateDayEnergy';
import { calculateHealthMap } from '../src/calculateHealthMap';
import { calculateMatrix } from '../src/calculateMatrix';
import { calculateMonthEnergy, calculateYearMonths } from '../src/calculateMonthEnergy';
import { calculateYearMapProfile } from '../src/calculateYearMapProfile';
import { calculateYearMatrix } from '../src/calculateYearMatrix';
import { enrichProfile } from '../src/enrichProfile';
import { buildAiGuideContext } from '../src/buildAiGuideContext';
import { buildReportData } from '../src/buildReportData';
import { createYearMap } from '../src/createYearMap';
import type { YearMapInput } from '../src/productApiTypes';

const input: YearMapInput = {
  fullName: 'Smoke Test',
  birthDate: '1990-04-12',
  targetYear: 2026,
};

const matrix = calculateMatrix(input);
const yearMatrix = calculateYearMatrix(input);

assert.equal(Object.keys(ARCANA_DICTIONARY).length, 22, 'arcanaDictionary exposes all 22 arcana');
assert.equal(getArcanaMeaning(23).number, 5, 'arcanaDictionary reduces values above 22');

const healthMap = calculateHealthMap({ matrix, yearMatrix });
assert.equal(healthMap.zones.length, 4, 'calculateHealthMap returns four foundation zones');
const bodyZone = healthMap.zones.find((zone) => zone.key === 'body');
assert.equal(bodyZone?.balanceScore, reduceSmokeEnergy(matrix.values.A + matrix.values.B + yearMatrix.values.A_Year), 'calculateHealthMap scores each source once');
assert.ok(healthMap.summaryEnergy >= 1 && healthMap.summaryEnergy <= 22, 'health map summary is reduced');

const monthEnergy = calculateMonthEnergy({ targetYear: input.targetYear, month: 6, yearMatrix });
assert.equal(monthEnergy.label, 'June', 'calculateMonthEnergy labels the requested month');
assert.ok(monthEnergy.energy >= 1 && monthEnergy.energy <= 22, 'month energy is reduced');

const months = calculateYearMonths(input.targetYear, yearMatrix);
assert.equal(months.length, 12, 'calculateYearMonths returns one record per month');

const dayEnergy = calculateDayEnergy({ date: '2026-06-02', monthEnergy });
assert.equal(dayEnergy.dayOfMonth, 2, 'calculateDayEnergy parses the day of month');
assert.ok(dayEnergy.energy >= 1 && dayEnergy.energy <= 22, 'day energy is reduced');

const profile = calculateYearMapProfile(input);
assert.equal(profile.months.length, 12, 'calculateYearMapProfile includes month energies');
assert.equal(profile.healthMap.zones.length, 4, 'calculateYearMapProfile includes health map zones');

const enrichedProfile = enrichProfile(profile);
assert.equal(enrichedProfile.months[0].arcana.number, enrichedProfile.months[0].energy, 'enrichProfile adds month arcana');
assert.ok(enrichedProfile.matrixArcana.A.title, 'enrichProfile adds matrix arcana');

const aiGuideContext = buildAiGuideContext(enrichedProfile);
assert.equal(aiGuideContext.yearlyThemes.length, 6, 'buildAiGuideContext selects yearly themes');
assert.equal(aiGuideContext.guardrails.length, 3, 'buildAiGuideContext includes guardrails');

const reportData = buildReportData(enrichedProfile);
assert.equal(reportData.sections.length, 4, 'buildReportData creates report sections');
assert.equal(reportData.aiGuideContext.subject.targetYear, input.targetYear, 'buildReportData embeds AI guide context');

const yearMap = createYearMap(input);
assert.equal(yearMap.reportData.sections.length, 4, 'createYearMap returns report data');
assert.equal(yearMap.aiGuideContext.subject.birthDate, input.birthDate, 'createYearMap returns AI guide context');

function reduceSmokeEnergy(value: number): number {
  let result = value;
  while (result > 22) {
    result = String(result).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  return result;
}

console.log('product foundation smoke tests passed');
