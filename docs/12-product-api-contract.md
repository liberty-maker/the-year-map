# Product API Contract

The Product API Contract defines the stable request and response shape for future frontend, mobile app, AI Guide, and PDF report surfaces.

It is not an API server yet. It does not create routes, handlers, deployment files, authentication, persistence, or network behavior. The contract is a TypeScript foundation that future API routes can reuse.

## Stable Product Response

`createYearMap` accepts one product request and returns one product response containing:

- the deterministic Year Map profile;
- AI Guide context;
- report data for preview or future PDF rendering.

This gives product surfaces one stable object instead of requiring each frontend view to call individual calculators and assemble its own response.

## Avoiding Fragmented Frontend Logic

Frontend and mobile clients should not need to understand calculation order. A single product response prevents duplicated orchestration logic and keeps profile, AI context, and report data aligned for the same input.

## Future API Usage

A future server or API route can wrap `createYearMap` with transport-level concerns such as validation responses, authentication, storage, rate limits, or localization. The deterministic contract can remain unchanged underneath.

## Locale

The request includes an optional `locale` field for future multilingual output. The current foundation stores the shape only; localized interpretation content can be added later without changing the core calculation formulas.
