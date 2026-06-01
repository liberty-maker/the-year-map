# Health Map

The Health Map is a symbolic self-reflection layer built from The Year Map base matrix values.

It is **not** a medical diagnostic feature. It does not diagnose, treat, prevent, or monitor disease. The output is intended for wellness-oriented reflection, personal insight, guided journaling, and future premium report experiences.

## What It Calculates

The Health Map groups matrix values into seven symbolic centers:

| Center | Physical | Energy | Emotional |
| --- | --- | --- | --- |
| Crown | `B` | `V` | `reduceToEnergy(B + V)` |
| Vision | `B2` | `V2` | `reduceToEnergy(B2 + V2)` |
| Voice | `B1` | `V1` | `reduceToEnergy(B1 + V1)` |
| Heart | `D` | `D` | `reduceToEnergy(D + D)` |
| Power | `A` | `A` | `reduceToEnergy(A + A)` |
| Creation | `G1` | `D1` | `reduceToEnergy(G1 + D1)` |
| Root | `G` | `D` | `reduceToEnergy(G + D)` |

Each row returns a physical value, energy value, and emotional value. The emotional value is the reduced sum of the row's physical and energy values.

## Overall Balance

`overallBalance` is a simple symbolic score from `0` to `100`:

```ts
Math.round((averageEmotional / 22) * 100)
```

The average uses the emotional values from all seven rows. This score is designed for high-level reflection only.

## Future Glass-Human Visual

The row structure is intentionally stable for a future glass-human visualization. Each `HealthCenterKey` can map directly to a visual region:

- `crown`
- `vision`
- `voice`
- `heart`
- `power`
- `creation`
- `root`

Because the calculator returns deterministic values and calculation steps, the visual layer can remain purely presentational.

## PDF Reports and AI Guide

The Health Map output is ready for future PDF and AI-guide layers because it includes:

- stable row keys;
- readable labels;
- physical, energy, and emotional values;
- an overall symbolic balance score;
- calculation steps for transparent explanations.

PDF reports can render the rows as a premium wellness section. An AI guide can use the rows as trusted context without recalculating or inventing values.
