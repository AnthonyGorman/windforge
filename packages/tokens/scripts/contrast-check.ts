/**
 * WCAG AA cross-check for the semantic token pairings actually used in components.
 * Composites alpha foregrounds/backgrounds over a base before measuring.
 * Run: npx tsx scripts/contrast-check.ts
 */
import { lightColors, darkColors } from '../src/source/semantic'

type RGB = [number, number, number]
function parse(hex: string): { rgb: RGB; a: number } {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  return { rgb: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB, a }
}
function over(fg: string, bg: string): RGB {
  const f = parse(fg), b = parse(bg)
  return f.rgb.map((c, i) => Math.round(c * f.a + b.rgb[i] * (1 - f.a))) as RGB
}
function lum([r, g, b]: RGB) {
  const v = [r, g, b].map((c) => c / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
}
function ratio(fgHex: string, bgHex: string, baseHex: string) {
  const bg = over(bgHex, baseHex)
  const fg = over(fgHex, `#${bg.map((c) => c.toString(16).padStart(2, '0')).join('')}`)
  const [l1, l2] = [lum(fg), lum(bg)].sort((a, b) => b - a)
  return (l1 + 0.05) / (l2 + 0.05)
}

type Pair = { label: string; fg: string; bg: string; base?: string; min: number }
function pairs(C: any): Pair[] {
  const base = C.background.default
  return [
    { label: 'Body text on page', fg: C.text.primary, bg: C.background.default, min: 4.5 },
    { label: 'Muted text on page', fg: C.text.secondary, bg: C.background.default, min: 4.5 },
    { label: 'Tertiary text on page', fg: C.text.tertiary, bg: C.background.default, min: 4.5 },
    { label: 'Body on paper', fg: C.text.primary, bg: C.background.paper, min: 4.5 },
    { label: 'Body on subtle', fg: C.text.primary, bg: C.background.subtle, min: 4.5 },
    { label: 'Placeholder (tertiary) on paper', fg: C.text.tertiary, bg: C.background.paper, min: 4.5 },
    { label: 'Link on page', fg: C.text.link, bg: C.background.default, min: 4.5 },
    { label: 'Primary button (inverse)', fg: C.text.inverse, bg: C.background.inverse, min: 4.5 },
    // Text on a brand fill (primary button, brand badge) uses the text-contrast
    // token (white/black), not brand-contrast — so it clears AA for body text.
    { label: 'Text on brand (button/badge)', fg: C.text.contrast, bg: C.brand.primary, min: 4.5 },
    // brand-contrast is the opposite mode's primary tint, used only as a graphical
    // brand-on-brand accent (e.g. the theming swatch dot) — held to the 3:1 bar.
    { label: 'Brand accent on brand (graphical)', fg: C.brand.primaryContrast, bg: C.brand.primary, min: 3 },
    { label: 'Brand text on brand-subtle', fg: C.brand.primary, bg: C.brand.primarySubtle, base, min: 4.5 },
    { label: 'Destructive button', fg: C.text.inverse, bg: C.status.errorDefault, min: 4.5 },
    { label: 'Success text on subtle', fg: C.status.successText, bg: C.status.successSubtle, base, min: 4.5 },
    { label: 'Warning text on subtle', fg: C.status.warningText, bg: C.status.warningSubtle, base, min: 4.5 },
    { label: 'Error text on subtle', fg: C.status.errorText, bg: C.status.errorSubtle, base, min: 4.5 },
    { label: 'Info text on subtle', fg: C.status.infoText, bg: C.status.infoSubtle, base, min: 4.5 },
    { label: 'Focus ring vs page', fg: C.border.focus, bg: C.background.default, min: 3 },
    { label: 'Control border vs paper', fg: C.border.strong, bg: C.background.paper, min: 3 },
    { label: 'Control border vs subtle', fg: C.border.strong, bg: C.background.subtle, min: 3 },
  ]
}

let failures = 0
for (const [mode, C] of [['LIGHT', lightColors], ['DARK', darkColors]] as const) {
  console.log(`\n${mode}`)
  for (const p of pairs(C)) {
    const r = ratio(p.fg, p.bg, p.base ?? C.background.default)
    const ok = r >= p.min
    if (!ok) failures++
    console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${p.min})  ${p.label}`)
  }
}
console.log(`\n${failures === 0 ? '✓ all pairings clear WCAG AA' : `✗ ${failures} failing pairing(s)`}`)
process.exit(failures === 0 ? 0 : 1)
