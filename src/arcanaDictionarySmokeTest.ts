import { ARCANA_DICTIONARY, getArcanaMeaning, getArcanaMeanings } from './arcanaDictionary';

assertEqual('dictionary size', Object.keys(ARCANA_DICTIONARY).length, 22);
assertEqual('arcana 14 title', getArcanaMeaning(14).title, 'Balance');
assertEqual('arcana 1 title', getArcanaMeaning(1).title, 'Magician');

const meanings = getArcanaMeanings([14, 14, 10, 6]);
assertEqual('deduplicated length', meanings.length, 3);
assertEqual('first arcana', meanings[0].arcana, 14);
assertEqual('second arcana', meanings[1].arcana, 10);
assertEqual('third arcana', meanings[2].arcana, 6);
assertThrows('invalid arcana 0', () => getArcanaMeaning(0));
assertThrows('invalid arcana 23', () => getArcanaMeaning(23));

function assertEqual(name: string, actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`${name} expected ${expected}, received ${actual}.`);
  }
}

function assertThrows(name: string, fn: () => unknown): void {
  try {
    fn();
  } catch {
    return;
  }

  throw new Error(`${name} expected an error.`);
}

console.log('Arcana dictionary smoke test passed.');
