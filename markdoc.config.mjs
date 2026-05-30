import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

// DECISION: a single Shiki theme (github-dark) over dual light/dark themes —
// keeps code blocks consistently styled and avoids dual-theme CSS-variable
// wiring. Dark code blocks read well on both the light and dark site themes.
export default defineMarkdocConfig({
  extends: [
    shiki({
      theme: 'github-dark',
      wrap: true,
    }),
  ],
});
