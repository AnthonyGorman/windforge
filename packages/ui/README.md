# @windforge/ui

React components for **Windforge** — a composable, configurable, strict design
system built on **Radix + Tailwind** with CSS-variable tokens and zero CSS-in-JS
runtime.

You build with two surfaces:

- **Components** take intent-named props (`variant="primary"`, `padding="card"`,
  `gap="md"`, `tone="muted"`) that expose only on-system options — `className` and
  `style` are rejected at the type level, so there's no path off-system. The
  escape hatch is the three layout primitives `Box` / `Stack` / `Grid`, which
  **do** accept `className` (including Tailwind arbitrary values like `w-[37%]`)
  and `style`. So the rare break-glass case stays contained to three named places.
- **Tokens** (`--wf-*` CSS variables, from [`@windforge/tokens`](https://www.npmjs.com/package/@windforge/tokens))
  reskin the whole library at once. A token change can't break a layout.

## Install

```bash
npm install @windforge/ui
```

`@windforge/tokens` comes along as a dependency. `react` / `react-dom` (^18.3)
are peer dependencies you'll already have in a React app.

## Setup

**1. Wire the Tailwind preset.** It ships the full theme, keyframes, animations,
and the `tailwindcss-animate` plugin, so there's no config to hand-copy:

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('@windforge/ui/tailwind')],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@windforge/ui/src/**/*.{ts,tsx}', // scan the library's classes
  ],
}
```

**2. Load the token CSS and wrap your app** in `ThemeProvider`:

```tsx
import { ThemeProvider, Toaster } from '@windforge/ui'
import '@windforge/tokens/tokens.css'

export function Root() {
  return (
    <ThemeProvider defaultMode="system" persist>
      <App />
      <Toaster />
    </ThemeProvider>
  )
}
```

## Use it

```tsx
import { Stack, Card, Text, Button } from '@windforge/ui'

export function Example() {
  return (
    <Card padding="card">
      <Stack gap="md">
        <Text>Composed entirely from on-system props — no className.</Text>
        <Button variant="primary">Continue</Button>
      </Stack>
    </Card>
  )
}
```

## Re-skin the brand at runtime

A brand is one **50→950 color ramp**; `themeVars` derives every role-named
`--wf-color-brand-*` variable from it (WCAG-aligned and mode-aware) and can swap
the font and radius in the same call. Because it's applied at the document root,
the swap reaches portaled overlays too:

```tsx
import { ThemeProvider, themeVars, type Ramp } from '@windforge/ui'

const brand: Ramp = {
  50:  '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
  500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
  950: '#172554',
}

<ThemeProvider tokens={(mode) => themeVars({ brand, fontSans: 'Inter, sans-serif' }, mode)}>
  <App />
</ThemeProvider>
```

`@windforge/ui` re-exports the entire `@windforge/tokens` surface, so `themeVars`,
`brandVars`, `brandRamp` (the default indigo ramp), and the `wf*` token constants
all import from here directly.

## What's included

Primitives (`Button`, `Card`, `Input`, `Badge`, `Text`/`H1`–`H6`…), Radix-backed
interactive components (`Select`, `Dialog`, `Tooltip`, `Tabs`, `Popover`,
`DropdownMenu`, `Command`, `DatePicker`…), data display (`Table`, `DataTable`,
`Chart`), layout primitives (`Box`, `Stack`, `Grid`) and shells (`AppShell`,
`SideNav`, `AppBar`). Use `lucide-react` for icons.

## License

MIT
