# Windforge

A **composable, configurable, strict** design system: **React + Radix + Tailwind**,
CSS-variable tokens, no CSS-in-JS runtime. Built so an AI agent can spin up
guaranteed-on-system SaaS and client products with minimal effort.

## Two layers, component-first / style-last

You build with Windforge through exactly two surfaces; Tailwind is an *internal
implementation detail* you never touch.

1. **Component layer.** Compose components and set **intent-named props**
   (`variant="primary"`, `padding="card"`, `gap="md"`, `tone="muted"`). Props expose
   only on-system options, so every permutation stays consistent. There is no raw
   `<div>`/`<span>` and no `className`: in fact `className` and `style` are a
   **compile error** on components, making Windforge stricter than MUI (which puts
   `sx` on everything). Reach for `Box`/`Stack`/`Grid` for layout and `Text`/`H1`–`H6`
   for type. Components are fluid; you size them by sizing the layout around them.
2. **Token layer.** Override the `--wf-*` CSS variables, anywhere and declaratively,
   to reskin the whole library at once (brand, density, radius, type). Because the
   component layer is consistent, a token change cannot break a layout; it just makes
   the product look unique.

**The one escape hatch:** the layout primitives `Box`, `Stack`, and `Grid` accept
`className` (including Tailwind arbitrary values like `w-[37%]`, `bg-[#1e40af]`) and
`style`: the lightweight, zero-runtime equivalent of MUI's `sx`. So strict props cover
~90%, and the rare break-glass case goes through three clearly-named primitives,
never scattered across the app.

## Why this architecture

| Idea | How it's met |
|---|---|
| Composable | A small set of primitives (`Box`, `Stack`, `Grid`, the components, `AppShell`) compose into any screen; spacing, color, and radius are tokens, so compositions stay on-grid. |
| Configurable | One token-based source of truth. Change a token, regenerate, and every component updates. Re-skin a brand without editing a single component. |
| Strict | A component-first, style-last paradigm: closed intent-named props plus a type-level lock on `className`/`style`. No path off-system, deterministic, and easy to review. |
| AI-native | Plain React and Tailwind that LLMs already generate, plus a machine-readable catalog the agent reads. The code says exactly what it does, so agents "just know" what to build. No runtime. |

## Layout

```
windforge/
├─ packages/
│  ├─ tokens/         @windforge/tokens (typed source of truth + compiler)
│  │  ├─ src/source/  primitives · semantic · scales · brand   (edit these)
│  │  ├─ src/generated/  tokens.css · variables.ts · tailwind-tokens.cjs  (build output)
│  │  └─ scripts/     generate.ts (the compiler) · brand-override.ts · contrast-check.ts
│  └─ ui/             @windforge/ui (Radix + Tailwind components, layouts, logo)
│     └─ src/         components · layouts · icons · lib · catalog.ts (the registry)
└─ apps/
   └─ studio/         the Vite studio site (overview + foundations + component docs)
```

The studio consumes the packages **straight from source** via Vite aliases; there is
no separate lib build step.

## Run it

```bash
npm install
npm run generate   # compile tokens (only needed after editing token source)
npm run dev        # → http://localhost:5174
```

`npm run build` runs `generate` then a production Vite build.

## Token pipeline

```
source/{primitives,semantic,scales,brand}.ts
   │  npm run generate
   ▼
generated/
   tokens.css          :root (light) + .dark
   tailwind-tokens.cjs  the Tailwind colour/radius/spacing map
   variables.ts         wfColorBrandPrimary = '--wf-color-brand-primary' …
```

Components reference tokens as legible Tailwind utilities (`bg-brand`,
`text-secondary`, `border-border`), never raw values. Reading text uses
`text-primary`; `text-secondary` is reserved for optional captions.

## Changing the brand

The package ships **one brand** (indigo, the `brandRamp` in `source/brand.ts`).
Everything is a `var(--wf-*)`, so a consumer overrides the brand at the CSS-variable
level. Pick the lever by binding time:

| Need | How |
|---|---|
| **The factory default** | Edit `brandRamp` in `source/brand.ts`, then `npm run generate`. |
| **A site's fixed identity** | `npm run brand-override -w @windforge/tokens > brand.css` (edit the ramp in the script), load it **after** `@windforge/tokens/tokens.css`. No JS. |
| **Map your own tokens** | In that override file, alias instead of using literals: `:root { --wf-color-brand-primary: var(--acme-brand-600); }` |
| **Runtime / live swap** | `<ThemeProvider tokens={(mode) => themeVars({ brand: ramp, fontSans, radius }, mode)}>`, no file. Applied at the document root, so it reaches portaled overlays too. (Studio's Theming page is built on this.) |

`brandVars(ramp, mode)` (exported from `@windforge/tokens`) derives the full brand
var-set (primary, hover, active, subtle, muted, secondary) from one ramp, so a custom
brand stays correct and WCAG-aligned without hand-writing the variables. Links and the
focus ring are intentionally not brand-derived.

Identity is **more than color**: `themeVars({ brand, fontSans, fontMono, radius, vars }, mode)`
(a superset of `brandVars`) overrides the font, the radius scale, and *any* other
`--wf-*` token in the same call — because every token is a CSS variable, a re-skin
is never limited to the palette. Studio's Theming page swaps both the brand and the
typeface through it.

## Consuming Windforge in your app

The library ships a complete **Tailwind preset** — theme (tokens), keyframes,
animations, and the `tailwindcss-animate` plugin — so you never hand-copy config:

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('@windforge/ui/tailwind')],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@windforge/ui/src/**/*.{ts,tsx}'],
}
```

Load `@windforge/tokens/tokens.css` once, wrap the app in `<ThemeProvider>`, and
inline `themeInitScript()` in `<head>` to set the color mode before first paint. The
studio dogfoods the preset — its own `tailwind.config.cjs` is just the snippet above.

## Accessibility

`npm run generate` keeps the tokens current; `npx tsx packages/tokens/scripts/contrast-check.ts`
audits every semantic foreground/background pairing against WCAG AA in both modes
(compositing alpha over its surface). All pairings clear AA.

## What's inside the studio

- **Overview**: the pillars, the live story cards, and the token pipeline.
- **Composition**: a full screen built entirely component-first, with zero raw elements.
- **Theming**: token-driven configuration; light/dark and a live brand swap (studio-owned palettes applied through the library's runtime token override).
- **Foundations**: Color, Typography, Spacing, Radius & elevation, All tokens, Accessibility (with computed WCAG ratios).
- **Components**: a documented, copy-pasteable page for every primitive (layout, typography, forms, overlays, navigation, feedback, data display).
