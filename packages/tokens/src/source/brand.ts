/**
 * BRAND — the single source of brand identity.
 *
 * `brandRamp` (indigo) IS the brand: primitives.ts derives `palette.brand` from
 * it, so importing the package gives you the indigo brand with nothing else to
 * configure. There is no multi-accent map in core — alternate palettes are an
 * application concern (see the studio showcase), applied through the generic
 * token-override capability below.
 *
 * `brandVars(ramp, mode)` re-derives the role-named brand CSS variables from any
 * 50→950 ramp. The compiler uses it for the baseline; it is also exported as a
 * public capability so a consumer (or studio) can produce a full brand override
 * — static `:root`/`.dark` CSS, or the runtime `ThemeProvider tokens` prop —
 * from a single ramp instead of hand-writing nine variables.
 *
 * Links (info) and the focus ring (neutral) are intentionally NOT brand-derived,
 * so they stay WCAG-stable across brands.
 */
export type Ramp = {
  50: string; 100: string; 200: string; 300: string; 400: string
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string
}

export type Mode = 'light' | 'dark'

/** The default brand ramp (indigo). Pulled in automatically on import. */
export const brandRamp: Ramp = {
  50:  '#eef2ff',
  100: '#e0e7ff',
  200: '#c7d2fe',
  300: '#a5b4fc',
  400: '#b1bafb', // dark-mode primary; also the light-mode brand-contrast tint (on brand[700])
  500: '#6366f1',
  600: '#4f46e5',
  700: '#4338ca',
  800: '#3730a3',
  900: '#312e81',
  950: '#1e1b4b',
}

const withAlpha = (hex: string, alpha: string) => `${hex}${alpha}`

/**
 * Derive the role-named brand CSS variables from a ramp, for one mode. Returns a
 * `--wf-*` → value map suitable for a static `:root`/`.dark` override or the
 * ThemeProvider `tokens` prop. `primaryContrast` is brand-derived too: it is the
 * *opposite* mode's primary stop — a brand-on-brand GRAPHICAL accent (e.g. the
 * theming swatch dot). Text on a brand fill uses the text-contrast token, not
 * this, so labels stay flat white/black and clear AA.
 */
export function brandVars(ramp: Ramp, mode: Mode): Record<string, string> {
  return mode === 'light'
    ? {
        '--wf-color-brand-primary':          ramp[700],
        '--wf-color-brand-primary-hover':    ramp[800],
        '--wf-color-brand-primary-active':   ramp[900],
        '--wf-color-brand-primary-subtle':   ramp[50],
        '--wf-color-brand-primary-muted':    ramp[100],
        '--wf-color-brand-primary-contrast': ramp[400], // dark-mode primary tint, on the light-mode primary face
        '--wf-color-brand-secondary':        ramp[500],
        '--wf-color-brand-secondary-hover':  ramp[600],
      }
    : {
        '--wf-color-brand-primary':          ramp[400],
        '--wf-color-brand-primary-hover':    ramp[300],
        '--wf-color-brand-primary-active':   ramp[200],
        '--wf-color-brand-primary-subtle':   withAlpha(ramp[500], '26'),
        '--wf-color-brand-primary-muted':    withAlpha(ramp[500], '40'),
        '--wf-color-brand-primary-contrast': ramp[700], // light-mode primary tint, on the dark-mode primary face
        '--wf-color-brand-secondary':        ramp[500],
        '--wf-color-brand-secondary-hover':  ramp[400],
      }
}
