/**
 * BRAND OVERRIDE GENERATOR (optional consumer helper).
 *
 * Emits a static `:root` / `.dark` CSS override for a single brand ramp, using
 * the very same `brandVars()` the compiler uses for the baseline — so a site's
 * custom brand is derived correctly (hover/active/subtle/muted/nav) instead of
 * hand-written. This is the lightweight lever for a site's FIXED identity: no
 * JS, no ThemeProvider, reaches `<body>`/chrome.
 *
 * Usage:
 *   1. Edit RAMP below to your brand's 50→950 ramp.
 *   2. npx tsx scripts/brand-override.ts > brand.css
 *   3. In the site, load brand.css AFTER `@windforge/tokens/tokens.css`.
 *
 * (For the runtime/live-swap lever instead, pass `brandVars(ramp, mode)` to the
 * `ThemeProvider tokens` prop — same function, no file.)
 */
import { brandVars, type Ramp } from '../src/source/brand'

// Example: a green brand. Replace with yours (or import it from your own source).
const RAMP: Ramp = {
  50:  '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
}

const toBlock = (sel: string, vars: Record<string, string>) =>
  `${sel} {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`

const css = [
  '/* Brand override — generated from one ramp. Load AFTER @windforge/tokens/tokens.css. */',
  toBlock(':root', brandVars(RAMP, 'light')),
  toBlock('.dark', brandVars(RAMP, 'dark')),
].join('\n')

console.log(css)
