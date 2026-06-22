# i18n Foundation

The i18n foundation normalizes user or device locale input into a small supported set.

## Supported locales

- `en`
- `ru`
- `uk`
- `ar`

Region variants are normalized to the base locale. For example:

- `en-GB` -> `en`
- `ru-RU` -> `ru`
- `uk-UA` -> `uk`
- `ar-JO` -> `ar`

Unsupported or missing locales fall back to `en`.

## Direction

Arabic returns `rtl`. All other supported locales return `ltr`.

This foundation does not translate product copy yet. It prepares the app contract for future localized content.
