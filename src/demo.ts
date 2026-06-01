import { createYearMap } from './createYearMap';

const yearMap = createYearMap({
  birthDate: '1998-06-15',
  targetYear: 2026,
  targetMonth: 6,
  targetDate: '2026-06-01',
});

console.log(JSON.stringify({ yearMap }, null, 2));
