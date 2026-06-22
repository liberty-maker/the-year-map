# Pricing and Entitlements

Pricing and entitlements define product access logic. This is not payment integration.

## Plans

- Free
- Report
- Premium
- Pro

## Current pricing model

- Free: £0
- Report: £9 one-time
- Premium: £12 monthly
- Pro: £29 monthly

## Entitlements

Each plan maps to a complete feature-access record. Future UI and backend code should use entitlements to decide whether to show, lock, preview, or upsell a feature.

Payment providers should map successful purchases or subscriptions to a stable `PlanId`.
