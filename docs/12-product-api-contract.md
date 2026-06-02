# Product API Contract

The product API contract defines the stable object shapes for the future application.

The main entry point is `createYearMap`, which returns:

- raw profile data;
- enriched profile data;
- AI guide context;
- report data.

## Purpose

This contract lets future UI, backend, AI, and PDF layers consume one coherent product structure instead of rebuilding data from separate modules.

## Current status

This is not a server API yet. It is the TypeScript product contract that a server or app screen can later wrap.
