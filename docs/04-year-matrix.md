# Year Matrix Architecture

The year matrix calculates target-year values derived from the personal matrix input and a selected year.

## Source Files

- Formula definitions: `/data/year-matrix-formulas.json`
- Calculation module: `/src/calculateYearMatrix.ts`

## Design Goals

- Keep year calculations deterministic.
- Keep the year matrix independent from UI and report rendering.
- Preserve intermediate steps for future explanations, AI context, and PDFs.
- Allow future formula versioning.

## Proposed Input Contract

```ts
type YearMatrixInput = {
  birthDate: string;
  targetYear: number;
  fullName?: string;
};
```

`birthDate` should use `YYYY-MM-DD` format.

## Proposed Output Contract

```ts
type YearMatrixResult = {
  formulaVersion: string;
  input: YearMatrixInput;
  values: Record<string, number>;
  steps: CalculationStep[];
};
```

## Calculation Flow

1. Validate birth date and target year.
2. Normalize the birth date.
3. Combine birth-date components with target-year components according to active formulas.
4. Calculate year matrix positions.
5. Return final values plus intermediate steps.

## Current MVP Status

This MVP creates the structure and placeholder calculation surface. Final year matrix rules still need to be defined in the formula data file and implemented in the module.
