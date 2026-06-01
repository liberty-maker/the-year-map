import { calculateHealthMap } from './calculateHealthMap';
import { calculateMatrix } from './calculateMatrix';

const baseMatrix = calculateMatrix({ birthDate: '1998-06-15' });
const healthMap = calculateHealthMap(baseMatrix);

const expectedRows = [
  { key: 'crown', label: 'Crown', physical: 6, energy: 9, emotional: 15 },
  { key: 'vision', label: 'Vision', physical: 18, energy: 6, emotional: 6 },
  { key: 'voice', label: 'Voice', physical: 12, energy: 15, emotional: 9 },
  { key: 'heart', label: 'Heart', physical: 6, energy: 6, emotional: 12 },
  { key: 'power', label: 'Power', physical: 15, energy: 15, emotional: 3 },
  { key: 'creation', label: 'Creation', physical: 9, energy: 12, emotional: 21 },
  { key: 'root', label: 'Root', physical: 3, energy: 6, emotional: 9 },
];

assertEqual('formulaVersion', healthMap.formulaVersion, 'health-map-v1');
assertEqual('overallBalance', healthMap.values.overallBalance, 49);
assertEqual('row count', healthMap.values.rows.length, expectedRows.length);
assertEqual('step count', healthMap.steps.length, expectedRows.length + 1);

for (const [index, expectedRow] of expectedRows.entries()) {
  const actualRow = healthMap.values.rows[index];

  assertEqual(`row ${index} key`, actualRow.key, expectedRow.key);
  assertEqual(`row ${index} label`, actualRow.label, expectedRow.label);
  assertEqual(`row ${index} physical`, actualRow.physical, expectedRow.physical);
  assertEqual(`row ${index} energy`, actualRow.energy, expectedRow.energy);
  assertEqual(`row ${index} emotional`, actualRow.emotional, expectedRow.emotional);
}

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

console.log('Health map smoke test passed.');
