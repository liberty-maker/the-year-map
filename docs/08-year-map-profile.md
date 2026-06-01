# Year Map Profile

The Year Map Profile is the unified calculation object for the future app, AI Guide, and PDF report layers.

Instead of asking frontend or report code to call every calculator separately, the profile module orchestrates the existing deterministic engines and returns one stable object that includes:

- base matrix values;
- year matrix values;
- symbolic Health Map values;
- Month Energy values;
- Day Energy values;
- high-level orchestration steps.

## Why a Unified Profile Exists

The calculation engine now has several independent modules. Those modules are useful on their own, but the product experience needs a single source of truth for a selected user context.

`calculateYearMapProfile` provides that source of truth. It keeps orchestration in the engine layer, not in UI components, AI prompts, or PDF templates.

## Home Dashboard

The future Home dashboard can consume one profile object and render:

- the user's base matrix summary;
- the active year matrix;
- symbolic Health Map balance;
- current month energy;
- current day energy.

This keeps the dashboard presentational and avoids duplicated formula calls.

## AI Guide

A future AI Guide can use the profile as trusted context. The guide should explain and reflect on calculated values rather than recalculate hidden formulas.

The profile includes high-level steps with representative values for each section so the AI layer can reference the calculation flow without needing every nested internal step.

## PDF Report

PDF report generation can use the same profile object to build repeatable sections:

- matrix overview;
- year guidance;
- symbolic wellness / Health Map section;
- month and day context;
- appendix-style calculation summaries.

Because the profile is deterministic, report output can be regenerated consistently for the same input.

## Frontend Contract

Frontend code should prefer one profile request over separate calculator calls. A single profile object reduces integration errors and makes it easier to cache, save, export, or pass the result to future app surfaces.
