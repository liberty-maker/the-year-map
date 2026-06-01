# Report Data

The Report Data Builder creates a deterministic content structure for future report preview and PDF rendering.

It is not a PDF renderer. It does not create files, layouts, pages, or visual assets. Instead, it prepares stable report content that a future renderer can consume.

## Stable Content Structure

`buildReportData` consumes a calculated Year Map Profile and returns `ReportData` with:

- report title and subtitle;
- user and generation context;
- the same symbolic safety disclaimer used by the AI Guide context;
- ordered report sections;
- section body text;
- section arcana references.

## Future PDF Renderer

A future PDF renderer can consume `ReportData` directly and focus only on layout, typography, pagination, and export mechanics. It should not recalculate profile values or rebuild interpretation context.

## Future App Preview

The app can use the same `ReportData` object for a report preview screen. This keeps the preview and downloaded PDF aligned because both surfaces consume the same deterministic content.

## Consistency Protection

The builder uses the AI Guide context and the Arcana Dictionary as trusted deterministic inputs. This protects consistency across app cards, AI Guide summaries, PDF reports, and saved report data.

## Safety Boundaries

Report language stays calm, symbolic, and non-diagnostic. It avoids fortune telling and does not provide medical, legal, financial, or psychological advice.
