import { palette } from './primitives'

/**
 * SEMANTIC COLOR TOKENS — role-named, mode-aware.
 *
 * `light` and `dark` MUST share an identical key set (a key in one must exist in
 * the other). The compiler walks these into CSS custom properties: every key
 * becomes `--wf-color-<group>-<name>` with the light value under `:root` and the
 * dark value under `.dark`.
 *
 * Components reference these as Tailwind utilities (`bg-brand`, `text-fg-muted`,
 * `border-border`) — the Tailwind preset maps each utility to the `var(--wf-…)`.
 */
export const lightColors = {
  background: {
    default:   palette.white,
    paper:     palette.white,
    subtle:    palette.neutral[50],
    inset:     palette.neutral[100],
    inverse:   palette.neutral[900],
    overlay:   palette.alpha.scrimLight,
    track:     palette.alpha.trackLight,  // translucent neutral — control track fill
  },
  text: {
    primary:   palette.neutral[900],
    secondary: palette.neutral[600],
    tertiary:  palette.neutral[500],
    disabled:  palette.neutral[400],
    inverse:   palette.white,
    contrast:  palette.white,       // pure white/black, mode-flipped — for text on filled/dark surfaces
    link:      palette.info[700],   // links are info-colored, not brand
    linkHover: palette.info[800],
  },
  border: {
    default:   palette.alpha.borderLight,        // universal surface outline — visible
    subtle:    palette.neutral[100],             // faint internal hairlines only
    strong:    palette.alpha.controlBorderLight, // transparent black — form-control outline
    focus:     palette.neutral[900],             // focus ring ≈ text color, not brand
    inverse:   palette.neutral[700],
  },
  brand: {
    primary:         palette.brand[700],
    primaryHover:    palette.brand[800],
    primaryActive:   palette.brand[900],
    primarySubtle:   palette.brand[50],
    primaryMuted:    palette.brand[100],
    primaryContrast: palette.brand[400],   // graphical brand-on-brand accent (opposite mode's primary tint) — NOT text; text on brand uses text.contrast
    secondary:       palette.brand[500],
    secondaryHover:  palette.brand[600],
  },
  status: {
    successDefault:  palette.success[600],
    successSubtle:   palette.success[50],
    successMuted:    palette.success[100],
    successText:     palette.success[800],
    warningDefault:  palette.warning[500],
    warningSubtle:   palette.warning[50],
    warningMuted:    palette.warning[100],
    warningText:     palette.warning[800],
    errorDefault:    palette.error[600],
    errorSubtle:     palette.error[50],
    errorMuted:      palette.error[100],
    errorText:       palette.error[800],
    infoDefault:     palette.info[600],
    infoSubtle:      palette.info[50],
    infoMuted:       palette.info[100],
    infoText:        palette.info[800],
  },
  common: {
    white:       palette.white,
    black:       palette.black,
    transparent: palette.transparent,
  },
} as const

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? DeepStringify<T[K]> : string
}

export type SemanticColors = DeepStringify<typeof lightColors>

export const darkColors: SemanticColors = {
  background: {
    default:   palette.neutral[950],
    paper:     palette.neutral[900],
    subtle:    palette.neutral[900],
    inset:     palette.neutral[800],
    inverse:   palette.white,
    overlay:   palette.alpha.scrimDark,
    track:     palette.alpha.trackDark,  // translucent neutral — control track fill
  },
  text: {
    primary:   palette.neutral[50],
    secondary: palette.neutral[300],
    tertiary:  palette.neutral[400],
    disabled:  palette.neutral[600],
    inverse:   palette.neutral[900],
    contrast:  palette.black,        // pure white/black, mode-flipped — for text on filled/dark surfaces
    link:      palette.info[300],   // links are info-colored, not brand
    linkHover: palette.info[100],
  },
  border: {
    default:   palette.alpha.borderDark,        // universal surface outline — visible
    subtle:    palette.neutral[800],            // faint internal hairlines only
    strong:    palette.alpha.controlBorderDark, // transparent white — form-control outline
    focus:     palette.neutral[50],             // focus ring ≈ text color, not brand
    inverse:   palette.neutral[300],
  },
  brand: {
    primary:         palette.brand[400],
    primaryHover:    palette.brand[300],
    primaryActive:   palette.brand[200],
    primarySubtle:   palette.alpha.brandSubtle,
    primaryMuted:    palette.alpha.brandMuted,
    primaryContrast: palette.brand[700],   // graphical brand-on-brand accent (opposite/light mode's primary tint) — NOT text; text on brand uses text.contrast
    secondary:       palette.brand[500],
    secondaryHover:  palette.brand[400],
  },
  status: {
    successDefault:  palette.success[400],
    successSubtle:   palette.surface.successSubtleDark,
    successMuted:    palette.alpha.successMuted,
    successText:     palette.success[300],
    warningDefault:  palette.warning[400],
    warningSubtle:   palette.surface.warningSubtleDark,
    warningMuted:    palette.alpha.warningMuted,
    warningText:     palette.warning[300],
    errorDefault:    palette.error[400],
    errorSubtle:     palette.surface.errorSubtleDark,
    errorMuted:      palette.alpha.errorMuted,
    errorText:       palette.error[300],
    infoDefault:     palette.info[400],
    infoSubtle:      palette.surface.infoSubtleDark,
    infoMuted:       palette.alpha.infoMuted,
    infoText:        palette.info[300],
  },
  common: {
    white:       palette.white,
    black:       palette.black,
    transparent: palette.transparent,
  },
} as const
