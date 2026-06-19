/**
 * NON-COLOR SCALES — spacing, radius, typography, elevation, motion.
 *
 * Spacing and radius are emitted as CSS custom properties (themeable) AND mapped
 * into the Tailwind preset. Typography / elevation / motion are emitted as CSS
 * vars too, so a theme swap can retune them without a rebuild.
 */

export const borderWidth = {
  default: '1px',
  control: '1.5px',
} as const

export const spacing = {
  // Semantic step scale — the single source of truth for layout spacing. These are
  // what Box `padding` / Stack `gap` render, and (because the names don't collide
  // with Tailwind's numeric scale) they also ship as utilities: p-md, gap-lg,
  // mt-sm, … Edit a value here and the props and utilities move together.
  none: '0rem',
  xs:    '0.25rem', // 4px
  sm:    '0.5rem',  // 8px
  md:    '1rem',    // 16px
  lg:    '1.5rem',  // 24px
  xl:    '2rem',    // 32px
  '2xl': '3rem',    // 48px
  // named / specific use cases
  nbsp:    '0.25rem',
  card:    '1rem',
  gutter:  '1.5rem',
  section: '2rem',
  page:    '3rem',
} as const

// Icon sizing — a named scale so icons size by intent, not raw h-/w- values.
// Ships as the single-class `size-icon*` utilities (width + height together):
//   size-icon-sm (inline with text) · size-icon (default) · size-icon-lg (feature).
export const iconSize = {
  sm: '1rem',   // 16px — inline with body text
  md: '1.5rem', // 24px — default (matches lucide's intrinsic size)
  lg: '2rem',   // 32px — large / feature
} as const

export const radius = {
  none:  '0rem',
  xs:    '0.125rem',
  sm:    '0.25rem',
  md:    '0.375rem',
  lg:    '0.5rem',
  xl:    '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full:  '9999px',
} as const

export const typeScale = {
  fontFamily: {
    sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, "Courier New", monospace',
  },
  size: {
    // sm (0.875rem / 14px) is the floor — no UI text renders smaller than this.
    sm:    '0.875rem',
    base:  '1rem',
    lg:    '1.125rem',
    xl:    '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  weight: {
    light:    '300',
    regular:  '400',
    medium:   '500',
    semibold: '600',
    bold:     '700',
  },
  lineHeight: {
    none:    '1',
    tight:   '1.15',
    snug:    '1.3',
    base:    '1.5',
    relaxed: '1.65',
  },
  letterSpacing: {
    tighter: '-0.02em',
    tight:   '-0.01em',
    normal:  '0em',
    wide:    '0.025em',
    wider:   '0.05em',
    widest:  '0.1em',
  },
} as const

export const elevation = {
  none: 'none',
  xs:   '0 1px 2px 0 rgb(2 6 23 / 0.05)',
  sm:   '0 1px 3px 0 rgb(2 6 23 / 0.10), 0 1px 2px -1px rgb(2 6 23 / 0.10)',
  md:   '0 4px 6px -1px rgb(2 6 23 / 0.10), 0 2px 4px -2px rgb(2 6 23 / 0.10)',
  lg:   '0 10px 15px -3px rgb(2 6 23 / 0.10), 0 4px 6px -4px rgb(2 6 23 / 0.10)',
  xl:   '0 20px 25px -5px rgb(2 6 23 / 0.10), 0 8px 10px -6px rgb(2 6 23 / 0.10)',
  '2xl':'0 25px 50px -12px rgb(2 6 23 / 0.25)',
  // Brand-derived glow — references the brand var via color-mix, so it follows a
  // rebrand instead of being a hardcoded purple. Used for hero/feature emphasis.
  glow: '0 0 0 1px color-mix(in srgb, var(--wf-color-brand-primary) 15%, transparent), 0 8px 30px -6px color-mix(in srgb, var(--wf-color-brand-primary) 35%, transparent)',
} as const

export const motion = {
  duration: {
    instant: '0ms',
    fast:    '120ms',
    normal:  '200ms',
    slow:    '320ms',
  },
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    out:      'cubic-bezier(0, 0, 0.2, 1)',
    in:       'cubic-bezier(0.4, 0, 1, 1)',
    spring:   'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
} as const
