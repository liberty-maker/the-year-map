import { calculateMatrix } from './calculateMatrix';
import { calculateYearMatrix } from './calculateYearMatrix';

const birthDate = '1998-06-15';
const targetYear = 2026;

const result = {
  baseMatrix: calculateMatrix({ birthDate }),
  yearMatrix: calculateYearMatrix({ birthDate, targetYear }),
};

console.log(JSON.stringify(result, null, 2));
