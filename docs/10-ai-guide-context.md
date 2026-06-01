# AI Guide Context

The AI Guide Context is a deterministic preparation layer for future chat, report, and guided-reflection experiences.

It does not call any external AI service and it does not calculate new formulas. It receives an already calculated Year Map Profile and reshapes it into a safe, structured context object.

## AI Guide Should Not Calculate Values

The calculation engine is the source of truth. A future AI Guide should explain, summarize, and reflect on values that have already been calculated by deterministic modules.

This prevents prompt drift, hidden formula changes, and inconsistent outputs between the app, PDF reports, and chat experiences.

## Deterministic Profile Context

The context builder extracts:

- today's focus from `D_Day`;
- month focus from `D_Month`;
- year focus from `D_Year`;
- core focus from base matrix `D`;
- section arcana for identity, year, symbolic health, month, and day.

It also adds concise summaries and suggested questions that can be reused by UI cards, PDF sections, or a future AI prompt.

## Consistency Protection

Because the builder consumes `YearMapProfileValues`, every downstream surface can reference the same profile object. The AI layer does not need to know how to calculate matrix, health, month, or day values.

## Future Chat Usage

A future chat endpoint can pass this context object into a model as trusted data. The model should answer from the context, avoid inventing values, and ask clarifying questions when the user wants personal interpretation beyond the supplied data.

## Safety Boundaries

The context includes a disclaimer that the guide is symbolic self-reflection only. Future AI responses should avoid medical, legal, financial, or psychological advice and should not present symbolic values as predictions or diagnoses.
