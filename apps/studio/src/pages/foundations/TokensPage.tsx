import {
  lightColors, Box, Stack, Text,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const NAMING: [string, string, string][] = [
  ['brand.primary', '--wf-color-brand-primary', 'wfColorBrandPrimary'],
  ['brand.primaryHover', '--wf-color-brand-primary-hover', 'wfColorBrandPrimaryHover'],
  ['background.subtle', '--wf-color-background-subtle', 'wfColorBackgroundSubtle'],
  ['text.link', '--wf-color-text-link', 'wfColorTextLink'],
]

function countTokens() {
  let n = 0
  for (const g of Object.values(lightColors as Record<string, Record<string, string>>)) n += Object.keys(g).length
  return n
}

export function TokensPage() {
  const colorCount = countTokens()
  return (
    <PageLayout
      eyebrow="Foundations"
      title="All tokens"
      description="A typed source of truth compiles to three artifacts at once: CSS custom properties, a Tailwind color map, and TypeScript constants. Edit a token, regenerate, and every consumer updates. A consumer can also override any token at the CSS-variable level, statically for a fixed brand, or at runtime."
    >
      <Section title="The pipeline" subtitle="Primitives feed semantic tokens; the compiler emits everything downstream.">
        <Box className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-6 font-mono text-sm">
          {['primitives.ts', 'semantic.ts', 'generate.ts', 'tokens.css + tailwind + variables.ts', 'components'].map((s, i, arr) => (
            <Box key={s} className="flex items-center gap-2">
              <Box className="rounded-md border border-border bg-surface-subtle px-3 py-1.5 text-primary">{s}</Box>
              {i < arr.length - 1 && <Box className="text-tertiary">→</Box>}
            </Box>
          ))}
        </Box>
        <Box className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[[colorCount, 'semantic colors'], [2, 'modes (light/dark)'], [1, 'brand, fully swappable']].map(([n, l]) => (
            <Box key={l as string} className="rounded-xl border border-border bg-surface p-4">
              <Box className="text-2xl font-bold text-brand">{n}</Box>
              <Text size="sm" tone="muted">{l}</Text>
            </Box>
          ))}
        </Box>
      </Section>

      <PageDivider />

      <Section title="One naming rule" subtitle="A token path maps deterministically to its CSS variable and its TypeScript constant.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token path</TableHead>
              <TableHead>CSS variable</TableHead>
              <TableHead>TS constant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NAMING.map(([path, css, ts]) => (
              <TableRow key={path}>
                <TableCell><Text mono size="sm">{path}</Text></TableCell>
                <TableCell><Text mono size="sm" tone="muted">{css}</Text></TableCell>
                <TableCell><Text mono size="sm" tone="brand">{ts}</Text></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      <PageDivider />

      <Section title="Two ways to consume" subtitle="Use the Tailwind utility in markup, and the constant when you need the raw variable in JS.">
        <Example
          code={`// 1. Tailwind utility (the default, what components use)
<Box className="bg-surface text-secondary border-border rounded-lg p-card" />

// 2. The wf* constant → bare CSS var name, for dynamic JS styling
import { Box, wfColorBrandPrimary } from '@windforge/ui'
<Box style={{ color: \`var(\${wfColorBrandPrimary})\` }} />`}
        />
      </Section>
    </PageLayout>
  )
}
