# Time Energy

Time Energy adds deterministic month and day calculations for the future Home dashboard.

The goal is to provide lightweight, repeatable context for a selected month and date without adding UI, AI behavior, or persistence. These values are symbolic self-reflection signals, not predictions or medical guidance.

## Month Energy

Month Energy uses the target year and target month to calculate a month-level energy set.

### Inputs

- birth date context;
- target year;
- target month.

### Formulas

`daysInMonth` is the actual number of days in the target month.

`A_Month` is based on month length:

| Days in month | A_Month |
| --- | --- |
| 28 | 19 |
| 29 | 20 |
| 30 | 6 |
| 31 | 10 |

The remaining month values are:

```ts
B_Month = reduceToEnergy(targetMonth * daysInMonth)
G_Month = reduceToEnergy(A_Month + B_Month)
D_Month = reduceToEnergy(A_Month + B_Month + G_Month)
```

## Day Energy

Day Energy combines the birth date with a selected target date.

### Inputs

- birth date context;
- target date in `YYYY-MM-DD` format.

### Formulas

```ts
A_Day = reduceToEnergy(birthDay + targetDay)
B_Day = reduceToEnergy(birthMonth + targetMonth)
G_Day = reduceToEnergy(A_Day + B_Day)
D_Day = reduceToEnergy(A_Day + B_Day + G_Day)
```

## Home Dashboard Readiness

The future Home dashboard can use these modules to show:

- the active year matrix;
- the current month energy;
- the current day energy;
- a symbolic summary of the user's present context.

Because the modules return structured values and calculation steps, the dashboard can render clean cards without owning calculation logic.

## AI Guide Context

A future AI Guide can use the deterministic year, month, and day context as trusted input. The guide should explain or reflect on calculated values, not recalculate them or invent hidden formulas.
