# The Year Map — Roadmap

## Phase 1 — Calculation Engine Foundation

- Define formula data contracts in `/data`.
- Create TypeScript calculation modules in `/src`.
- Return structured, deterministic calculation outputs.
- Keep calculation logic independent from UI, AI, and PDF generation.

## Phase 2 — Formula Completion

- Replace placeholder formula definitions with final matrix rules.
- Replace placeholder year matrix definitions with final year matrix rules.
- Add known examples for manual verification.
- Add unit tests for edge cases and expected outputs.

## Phase 3 — Interpretation Layer

- Add interpretation content for calculated values.
- Keep interpretations separate from calculation formulas.
- Prepare structured context for a future AI assistant.

## Phase 4 — Product Interfaces

- Add UI after the engine is stable.
- Add PDF report generation after report data contracts are stable.
- Add assistant functionality after deterministic outputs are complete.

## Explicitly Out of Scope for This MVP

- Next.js pages;
- Docker;
- CI/CD;
- deployment files;
- authentication;
- payment flows;
- database persistence;
- PDF rendering;
- AI assistant implementation.
