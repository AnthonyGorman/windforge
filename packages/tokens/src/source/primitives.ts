import { brandRamp as brand } from './brand'

/**
 * PRIMITIVE COLOR TOKENS — the raw palette.
 *
 * Never consumed by components directly. The semantic layer (semantic.ts) maps
 * these to role-named tokens, and the compiler (scripts/generate.ts) emits those
 * as CSS custom properties + `wf*` JS constants + a Tailwind color map.
 *
 * Named by FUNCTION, not hue:
 *   brand   = primary + secondary (the brand ramp — see below)
 *   neutral = surfaces / text / borders (cool slate)
 *   info    = informational & links (a plain blue)
 *   success / warning / error = status
 * Transparent values use 8-digit hex (#RRGGBBAA).
 *
 * BRAND IS SINGLE-SOURCED: the `brand` ramp (and the brand alpha washes below)
 * are the one `brandRamp` defined in brand.ts. To re-skin a new site, edit that
 * ramp (or override the brand vars at consumption — see brand.ts `brandVars`).
 *
 * Accessibility note: the default brand ramp (indigo) is chosen so the semantic
 * pairings in semantic.ts clear WCAG AA. Text on a brand fill uses text-contrast
 * (white/black) — light brand[700] under white → ~7.9:1; dark brand[400] under
 * black → ~11:1. brand-contrast (the opposite mode's primary tint) is a separate
 * graphical brand-on-brand accent, held only to the 3:1 bar, never used for text.
 */
export const palette = {
  brand,
  neutral: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  info: {
    // a plain, unambiguous blue (not sky/teal) — also the link color
    50:  '#eff6ff',
    100: '#dbeafe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8', // link blue — clears AA on white (~5.9:1)
    800: '#1e40af',
    900: '#1e3a8a',
  },
  success: {
    50:  '#ecfdf5',
    100: '#d1fae5',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    800: '#065f46',
    900: '#064e3b',
  },
  warning: {
    50:  '#fffbeb',
    100: '#fef3c7',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50:  '#fef2f2',
    100: '#fee2e2',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  // ── Alpha & overlay primitives ────────────────────────────────────────────
  alpha: {
    scrimLight:    '#0f172a99', // neutral900 @ 60% — light-mode modal/backdrop scrim
    scrimDark:     '#000000b3', // black @ 70% — dark-mode modal/backdrop scrim
    // brand washes for the dark brand-subtle/muted — derived from the brand ramp
    brandSubtle:   `${brand[500]}26`, // brand500 @ 15% — brand.primarySubtle (dark)
    brandMuted:    `${brand[500]}40`, // brand500 @ 25% — brand.primaryMuted (dark)
    borderLight:        '#0000003d', // black @ 24% — universal surface outline (light)
    borderDark:         '#ffffff2e', // white @ 18% — universal surface outline (dark)
    controlBorderLight: '#0000008c', // black @ 55% — form-control outline (light)
    controlBorderDark:  '#ffffff80', // white @ 50% — form-control outline (dark)
    trackLight:         '#00000038', // black @ 22% — control track fill (switch-off, progress)
    trackDark:          '#ffffff33', // white @ 20% — control track fill (dark)
    successMuted:  '#10b98133',
    warningMuted:  '#f59e0b33',
    errorMuted:    '#ef444433',
    infoMuted:     '#3b82f633',
  },
  // ── Dark-mode solid surface tints ──────────────────────────────────────────
  surface: {
    successSubtleDark: '#0c2e25',
    warningSubtleDark: '#2c2410',
    errorSubtleDark:   '#2e1416',
    infoSubtleDark:    '#11203f',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const
