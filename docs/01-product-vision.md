# The Year Map — Product Vision

The Year Map is a calculation-first system for generating a personal matrix and a year matrix from a small set of user inputs.

## MVP Goal

Create a deterministic calculation engine that can later power:

- a web interface;
- an AI assistant;
- downloadable PDF reports;
- saved user readings.

The MVP does not include UI, authentication, payments, deployment, or report generation.

## Core Principles

1. **Deterministic first** — the same input must always produce the same output.
2. **Data-driven formulas** — calculation rules should be documented in `/data` so the engine can evolve without mixing formulas into presentation code.
3. **Composable modules** — matrix and year matrix calculations should be separate modules.
4. **Future-friendly output** — results should be structured for later use by UI, AI prompts, and PDF reports.

## Initial Inputs

The calculation engine is designed around these future inputs:

- full name;
- birth date;
- target year.

## Initial Outputs

The engine should eventually produce:

- personal matrix values;
- year matrix values;
- intermediate calculation steps;
- metadata describing the formula version used.
