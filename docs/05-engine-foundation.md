# Engine Foundation

The Year Map foundation separates deterministic calculation from interpretation and presentation.

The current engine uses the existing base matrix and year matrix calculators as the source of truth. Product modules compose those outputs into higher-level structures for future UI, AI guidance, and reports.

## Current layers

- Base Matrix: personal matrix values.
- Year Matrix: target-year values.
- Health Map: reflective zones derived from matrix and year values.
- Time Energy: month and day energy helpers.
- Product Profile: one composed object for downstream consumers.

## Principle

Calculations must remain deterministic. The same input must always return the same output.
