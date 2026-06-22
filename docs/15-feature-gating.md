# Feature Gating

Feature gating is the product logic that connects plans to feature access.

The current foundation exposes entitlement booleans for every known feature. Clients should consume this metadata instead of hard-coding plan checks in UI components.

## Current feature keys

- `baseMatrix`
- `yearMatrix`
- `healthMap`
- `monthEnergy`
- `dayEnergy`
- `aiGuide`
- `pdfReport`
- `clientMode`
- `advancedReports`

## Future use

Feature gating can support:

- locked cards;
- previews;
- upgrade prompts;
- PDF report access;
- AI guide limits;
- professional client tools.

This layer does not process payments and does not verify App Store, Play Store, or Stripe purchases.
