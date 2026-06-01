import type { ArcanaMeaning } from './arcanaDictionary';
import { getArcanaMeanings } from './arcanaDictionary';
import type { YearMapProfileResult } from './calculateYearMapProfile';

export type EnrichedYearMapProfile = {
  profile: YearMapProfileResult;
  meanings: {
    baseMatrix: ArcanaMeaning[];
    yearMatrix: ArcanaMeaning[];
    healthMap: ArcanaMeaning[];
    monthEnergy: ArcanaMeaning[];
    dayEnergy: ArcanaMeaning[];
  };
};

export function enrichProfile(profile: YearMapProfileResult): EnrichedYearMapProfile {
  const { baseMatrix, yearMatrix, healthMap, monthEnergy, dayEnergy } = profile.values;

  return {
    profile,
    meanings: {
      baseMatrix: getArcanaMeanings([
        baseMatrix.A,
        baseMatrix.B,
        baseMatrix.V,
        baseMatrix.G,
        baseMatrix.D,
        baseMatrix.K,
        baseMatrix.L,
        baseMatrix.M,
      ]),
      yearMatrix: getArcanaMeanings([
        yearMatrix.A_Year,
        yearMatrix.B_Year,
        yearMatrix.V_Year,
        yearMatrix.G_Year,
        yearMatrix.D_Year,
        yearMatrix.K_Year,
        yearMatrix.L_Year,
        yearMatrix.M_Year,
        yearMatrix.Zh_Year,
      ]),
      healthMap: getArcanaMeanings(healthMap.rows.map((row) => row.emotional)),
      monthEnergy: getArcanaMeanings([
        monthEnergy.A_Month,
        monthEnergy.B_Month,
        monthEnergy.G_Month,
        monthEnergy.D_Month,
      ]),
      dayEnergy: getArcanaMeanings([
        dayEnergy.A_Day,
        dayEnergy.B_Day,
        dayEnergy.G_Day,
        dayEnergy.D_Day,
      ]),
    },
  };
}
