import type { Energy } from './types';

export function reduceToEnergy(value: number): Energy {
  validateEnergyInput(value);

  let energy = value;

  while (energy > 22) {
    energy = sumDigits(energy);
  }

  return energy;
}

export function sumDigits(value: number): number {
  validateEnergyInput(value);

  return String(value)
    .replace(/\D/g, '')
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);
}

function validateEnergyInput(value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error('Energy value must be a finite number.');
  }

  if (!Number.isInteger(value)) {
    throw new Error('Energy value must be an integer.');
  }

  if (value < 1) {
    throw new Error('Energy value must be greater than or equal to 1.');
  }
}
