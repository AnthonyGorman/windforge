/**
 * llms.txt GENERATOR.
 *
 * Emits `packages/ui/llms.txt` — a flat, fetchable spec of Windforge for LLMs,
 * following the llmstxt.org convention. It is generated from the same `catalog`
 * the components are validated against, so the agent-facing spec can never drift
 * from the code. Run it after a component/prop change:
 *
 *   npx tsx packages/ui/scripts/generate-llms.ts
 *
 * `buildLlmsTxt()` is exported pure (returns the string) so it can be unit-tested
 * without touching the filesystem.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { catalog, type ComponentSpec } from '../src/catalog'

function renderComponent(name: string, spec: ComponentSpec): string {
  const lines = [`### ${name}`, spec.summary]
  if (spec.props && Object.keys(spec.props).length) {
    lines.push('', 'Props:')
    for (const [prop, values] of Object.entries(spec.props)) {
      lines.push(`- \`${prop}\`: ${values.map((v) => `\`${v}\``).join(' | ')}`)
    }
  }
  if (spec.flags && Object.keys(spec.flags).length) {
    lines.push('', 'Flags:')
    for (const [flag, note] of Object.entries(spec.flags)) {
      lines.push(`- \`${flag}\`: ${note}`)
    }
  }
  return lines.join('\n')
}

/** Build the full llms.txt document from the catalog. Pure — no I/O. */
export function buildLlmsTxt(): string {
  const components = Object.entries(catalog)
    .map(([name, spec]) => renderComponent(name, spec))
    .join('\n\n')

  return `# Windforge (@windforge/ui)

> A composable, configurable, strict React design system built on Radix + Tailwind
> with CSS-variable tokens and zero CSS-in-JS runtime. You build with two surfaces:
> intent-named component props, and \`--wf-*\` design tokens.

## Rules

- Compose components and set intent-named props (e.g. \`variant="primary"\`,
  \`padding="card"\`, \`gap="md"\`). Props expose only the closed set of on-system
  values listed below — do not invent values.
- \`className\` and \`style\` are rejected at the type level on components. Only the
  layout primitives \`Box\` / \`Stack\` / \`Grid\` accept \`className\` (incl. Tailwind
  arbitrary values like \`w-[37%]\`) and \`style\`, as the escape hatch.
- Use \`Box\` / \`Stack\` / \`Grid\` for layout and \`Text\` / \`H1\`–\`H6\` for type instead
  of bare \`<div>\` / \`<span>\`. Components are fluid; size them via the layout around
  them.
- Re-skin by overriding \`--wf-*\` tokens (see \`@windforge/tokens\`), never by editing
  components. A token change cannot break a layout.

## Setup

\`\`\`js
// tailwind.config.cjs
module.exports = {
  presets: [require('@windforge/ui/tailwind')],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@windforge/ui/src/**/*.{ts,tsx}'],
}
\`\`\`

\`\`\`tsx
import { ThemeProvider } from '@windforge/ui'
import '@windforge/tokens/tokens.css'

<ThemeProvider defaultMode="system" persist><App /></ThemeProvider>
\`\`\`

## Components

${components}
`
}

// Run directly → write the file. (Importing for tests does not.)
const isMain = process.argv[1] === fileURLToPath(import.meta.url)
if (isMain) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const out = resolve(__dirname, '../llms.txt')
  writeFileSync(out, buildLlmsTxt())
  console.log(`✓ wrote ${out} (${Object.keys(catalog).length} components)`)
}
