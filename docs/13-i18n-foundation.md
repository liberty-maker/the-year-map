# i18n Foundation

The i18n foundation prepares The Year Map product contract for device language detection and future manual language selection.

It does not translate content yet and it does not add UI. The current engine still returns English copy while exposing normalized locale and text direction in the product response.

## Supported Locales

The v1 foundation supports these locale roots:

- `en`
- `ru`
- `uk`
- `ar`

Region variants are normalized to their base locale, such as `en-GB` to `en`, `ru-RU` to `ru`, `uk-UA` to `uk`, and `ar-JO` to `ar`.

## Device and Manual Language Selection

A future app can pass the detected device locale as `request.locale`. The app can also offer manual language selection and pass the selected locale through the same field.

Unknown or missing locales fall back to `en`.

## RTL Support

Arabic returns `direction: "rtl"`. All other supported locales return `direction: "ltr"`.

Future UI and PDF layers should use this direction value when laying out text and report content.

## Future Translation Strategy

Translation is intentionally deferred. Future localization should cover:

- UI labels;
- report text;
- Arcana Dictionary entries;
- AI Guide prompts and summaries;
- PDF section headings and body copy.

Localization should not change deterministic calculation formulas or numeric outputs.
