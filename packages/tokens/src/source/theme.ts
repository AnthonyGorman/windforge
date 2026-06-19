/**
 * THEME — seamless, whole-identity overrides from one call.
 *
 * `brandVars` reskins the brand color. `themeVars` is the superset: it derives the
 * brand AND lets a consumer override the font, the radius scale, and *any* other
 * `--wf-*` token in the same map — because every token in Windforge is a CSS
 * variable, the identity is not just the color. The result is a `--wf-*` → value
 * map suitable for a static `:root`/`.dark` override or the `ThemeProvider tokens`
 * prop. Nothing here rebuilds; the values move under stable class names.
 *
 *   themeVars(
 *     { brand: acmeRamp, fontSans: '"Geist", system-ui, sans-serif', radius: { lg: '1rem' } },
 *     'light',
 *   )
 */
import { brandVars, type Ramp, type Mode } from './brand'
import { radius } from './scales'

type RadiusStep = keyof typeof radius

export interface ThemeOverride {
  /** Brand ramp (50→950). Derives the full role-named brand var set for the mode. */
  brand?: Ramp
  /** Body/UI font stack — any valid CSS `font-family` value. */
  fontSans?: string
  /** Monospace font stack. */
  fontMono?: string
  /** Override individual radius steps by token name (e.g. `{ lg: '1rem' }`). */
  radius?: Partial<Record<RadiusStep, string>>
  /** Escape hatch: any additional raw `--wf-*` → value pairs, applied verbatim. */
  vars?: Record<string, string>
}

/** Build a full `--wf-*` override map for one mode from a friendly theme config. */
export function themeVars(theme: ThemeOverride, mode: Mode): Record<string, string> {
  const out: Record<string, string> = {}
  if (theme.brand) Object.assign(out, brandVars(theme.brand, mode))
  if (theme.fontSans) out['--wf-font-sans'] = theme.fontSans
  if (theme.fontMono) out['--wf-font-mono'] = theme.fontMono
  if (theme.radius)
    for (const [step, value] of Object.entries(theme.radius)) out[`--wf-radius-${step}`] = value
  if (theme.vars) Object.assign(out, theme.vars)
  return out
}
