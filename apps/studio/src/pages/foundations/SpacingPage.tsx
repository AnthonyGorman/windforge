import { spacing, Box, Stack, Text, Table, TableBody, TableRow, TableCell } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'

const STEPS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
const NAMED: [string, string][] = [
  ['nbsp', 'Inline gap ~ a non-breaking space (chips, icon+label)'],
  ['card', 'Inner padding for contained surfaces'],
  ['gutter', 'Standard content gutter between columns'],
  ['section', 'Vertical gap between page sections'],
  ['page', 'Outer page padding on wide layouts'],
]

function remToPx(rem: string) {
  const n = parseFloat(rem)
  return rem.endsWith('rem') ? `${n * 16}px` : rem
}

export function SpacingPage() {
  return (
    <PageLayout
      eyebrow="Foundations"
      title="Spacing"
      description="Layout spacing flows through one scale: semantic steps (xs–2xl) plus named tokens for recurring cases. Each step is a --wf-spacing-* token you apply as a prop (padding=&quot;md&quot;) or a utility (p-md, gap-lg) — one source of truth, never a raw px."
    >
      <Section title="Step scale" subtitle="The steps Box padding and Stack gap render — also available directly as p-*, gap-*, and m-* utilities.">
        <Box className="space-y-3 rounded-xl border border-border bg-surface p-6">
          {STEPS.map((key) => {
            const value = (spacing as Record<string, string>)[key]
            return (
              <Stack key={key} direction="row" align="center" className="gap-4">
                <Box className="w-10 shrink-0 font-mono text-sm text-brand">{key}</Box>
                <Box className="w-24 shrink-0 font-mono text-sm text-tertiary">{value} · {remToPx(value)}</Box>
                <Box className="h-4 rounded bg-brand" style={{ width: `var(--wf-spacing-${key})`, minWidth: 1 }} />
              </Stack>
            )
          })}
        </Box>
      </Section>

      <PageDivider />

      <Section title="Named tokens" subtitle="Semantic spacing for the cases that recur across every layout.">
        <Table>
          <TableBody>
            {NAMED.map(([key, desc]) => {
              const value = (spacing as Record<string, string>)[key]
              return (
                <TableRow key={key}>
                  <TableCell><Text mono size="sm">--wf-spacing-{key}</Text></TableCell>
                  <TableCell><Text mono size="sm" tone="muted">{value}</Text></TableCell>
                  <TableCell><Text size="sm" tone="muted">{desc}</Text></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Section>

      <PageDivider />

      <Section title="In Tailwind" subtitle="Every step and named token is also a utility — p-md, gap-lg, p-card, my-section — all resolving to the same vars the props use.">
        <Box className="flex flex-wrap gap-4">
          <Box className="rounded-lg border border-border bg-surface p-sm text-sm text-secondary">p-sm (8px)</Box>
          <Box className="rounded-lg border border-border bg-surface p-md text-sm text-secondary">p-md (16px)</Box>
          <Box className="rounded-lg border border-border bg-surface p-lg text-sm text-secondary">p-lg (24px)</Box>
          <Box className="rounded-lg border border-border bg-surface p-card text-sm text-secondary">p-card (16px)</Box>
        </Box>
      </Section>
    </PageLayout>
  )
}
