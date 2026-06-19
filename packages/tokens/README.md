# @windforge/tokens

The typed token source of truth for **Windforge** — a token-driven, AI-native
design system. Every design decision (color, spacing, radius, type, elevation,
motion) is a `--wf-*` CSS variable, so the whole UI re-skins from one place with
no CSS-in-JS runtime.

Most apps consume tokens transitively through
[`@windforge/ui`](https://www.npmjs.com/package/@windforge/ui), which re-exports
this entire surface. Install directly when you want the CSS, the Tailwind map, or
the token constants on their own.

## Install

```bash
npm install @windforge/tokens
```

## Exports

| Entry | What it is |
|---|---|
| `@windforge/tokens` | Typed constants — `wfColorBrandPrimary = '--wf-color-brand-primary'`, … — plus `brandRamp` (the default indigo ramp), the `brandVars` / `themeVars` derivers, and the `Ramp` / `Mode` types. |
| `@windforge/tokens/tokens.css` | The generated stylesheet: `:root` (light) + `.dark`. Import once at app root. |
| `@windforge/tokens/tailwind` | The Tailwind color / radius / spacing / type map, consumed by the `@windforge/ui` preset. |

## Use it

```ts
import '@windforge/tokens/tokens.css'
import { wfColorBrandPrimary } from '@windforge/tokens'

const accent = `var(${wfColorBrandPrimary})` // → var(--wf-color-brand-primary)
```

## Re-skin via tokens

Override any `--wf-*` variable in plain CSS to reskin the library — a token
change can't break a layout, only restyle it:

```css
/* load after @windforge/tokens/tokens.css */
:root {
  --wf-color-brand-primary: var(--acme-brand-600);
}
```

Or derive a full, WCAG-aligned brand var-set from a single **50→950 ramp**. The
brand isn't nine hand-written variables — `brandVars(ramp, mode)` produces the
role-named `--wf-color-brand-*` set from one ramp for a given mode:

```ts
import { brandVars, type Ramp } from '@windforge/tokens'

const brand: Ramp = {
  50:  '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
  500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
  950: '#172554',
}

const vars = brandVars(brand, 'light')
// → { '--wf-color-brand-primary': '#1d4ed8', '--wf-color-brand-primary-hover': …, … }
```

`themeVars` wraps `brandVars` and also swaps font, radius, and any other token in
the same call:

```ts
import { themeVars } from '@windforge/tokens'

const vars = themeVars({ brand, fontSans: 'Inter, sans-serif' }, 'light')
```

Feed the result to a static `:root`/`.dark` rule, or pass it to `@windforge/ui`'s
`ThemeProvider` `tokens` prop for live, mode-aware theming.

## License

MIT
