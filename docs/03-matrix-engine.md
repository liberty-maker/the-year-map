# Matrix Engine Architecture

The matrix engine calculates a personal matrix from user birth data and, later, optional name data.

## Source Files

- Formula definitions: `/data/matrix-formulas.json`
- Calculation module: `/src/calculateMatrix.ts`

## Design Goals

- Keep the engine deterministic.
- Keep formulas data-driven where practical.
- Return intermediate steps for debugging and future report generation.
- Avoid coupling the engine to any frontend framework.

## Proposed Input Contract

```ts
type MatrixInput = {
  birthDate: string;
  fullName?: string;
};
```

`birthDate` should use `YYYY-MM-DD` format.

## Proposed Output Contract

```ts
type MatrixResult = {
  formulaVersion: string;
  input: MatrixInput;
  values: Record<string, number>;
  steps: CalculationStep[];
};
```

## Calculation Flow

1. Validate input shape.
2. Normalize the birth date.
3. Load or reference the active formula version.
4. Calculate each configured matrix position.
5. Return final values plus intermediate steps.

## Current MVP Status

This MVP creates the architecture and placeholder implementation. Final numerology, matrix, or proprietary rules still need to be added to the formula data file and calculation module.
