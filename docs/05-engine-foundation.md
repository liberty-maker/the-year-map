# Engine Foundation

The Year Map v1 calculation engine is now organized around shared primitives that keep formulas deterministic and make future calculation modules easier to add.

## Shared Types

Shared engine contracts live in `/src/types.ts`.

The important shared types are:

- `Energy` — the numeric energy value type used by matrix results.
- `BirthDateInput` — the shared birth-date input shape used by current and future calculators.
- `Gender` — a shared gender marker for future calculation contexts: `female`, `male`, `child`, or `unspecified`.
- `CalculationStep` — the audit record for one calculated point, including formula, readable input, raw value, and final value.
- `BaseMatrixValues` — the complete value contract for the base matrix.
- `YearMatrixValues` — the complete value contract for the year matrix.
- `CalculationResult<TValues>` — the reusable result shape for deterministic calculators.

These contracts let each calculator expose stable data without depending on UI, AI, PDF rendering, or storage concerns.

## reduceToEnergy

Shared energy reduction lives in `/src/reduceToEnergy.ts`.

The rule is deterministic:

1. Values from `1` to `22` return unchanged.
2. Values above `22` are repeatedly digit-summed until the result is within `1..22`.
3. Invalid values throw clear errors before calculation continues.

Examples:

- `23` becomes `5`.
- `31` becomes `4`.
- `50` becomes `5`.

Centralizing this primitive prevents future calculators from drifting into slightly different reduction behavior.

## Why Deterministic Output Matters

Every calculator returns:

- the formula version;
- normalized input;
- a complete `values` object;
- a `steps` array explaining each point.

This matters because the same input must always produce the same output. Deterministic results make it possible to:

- validate formulas with smoke tests;
- compare formula versions;
- safely render UI results;
- build AI context from trusted calculations;
- generate repeatable PDF reports;
- debug individual matrix points using calculation steps.

## Future Engine Modules

The shared foundation prepares the codebase for additional deterministic calculators, including:

- health map calculations;
- child matrix calculations;
- compatibility calculations;
- day energy calculations;
- month energy calculations;
- PDF report data assembly.

Each future module can reuse the same `BirthDateInput`, `Gender`, `Energy`, `CalculationStep`, `CalculationResult<TValues>`, and `reduceToEnergy` primitives while keeping its own formula-specific value type.
