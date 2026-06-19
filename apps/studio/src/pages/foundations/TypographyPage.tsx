import { typeScale, Box, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'

const SIZE_USAGE: Record<string, string> = {
  sm: 'Smallest size: captions, badges, secondary UI, table cells',
  base: 'Default body copy',
  lg: 'Lead paragraphs, card titles',
  xl: 'Section headings (h3)',
  '2xl': 'Page subheads (h2)',
  '3xl': 'Page titles (h1)',
  '4xl': 'Hero headings',
  '5xl': 'Display',
  '6xl': 'Marketing display',
}

export function TypographyPage() {
  return (
    <PageLayout
      eyebrow="Foundations"
      title="Typography"
      description="One typeface for UI (Inter) and one for code (JetBrains Mono). The scale is a set of tokens (font-size-*, font-weight-*, leading-*, tracking-*), so text is never sized with a one-off value."
    >
      <Section title="Type scale" subtitle="Each step is a --wf-font-size-* token. Use a step, never a raw rem.">
        <Box className="space-y-5 rounded-xl border border-border bg-surface p-6">
          {Object.entries(typeScale.size).reverse().map(([key, value]) => (
            <Box key={key} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-subtle pb-4 last:border-0 last:pb-0">
              <Box className="w-16 shrink-0">
                <Text mono size="sm" tone="brand">{key}</Text>
                <Text mono size="sm" tone="subtle">{value}</Text>
              </Box>
              <Box className="min-w-0 flex-1 truncate text-primary" style={{ fontSize: `var(--wf-font-size-${key})`, lineHeight: 1.2 }}>
                The quick brown fox
              </Box>
              <Box className="hidden shrink-0 text-sm text-secondary sm:block">{SIZE_USAGE[key]}</Box>
            </Box>
          ))}
        </Box>
      </Section>

      <PageDivider />

      <Section title="Weights" subtitle="Five weights establish hierarchy without relying on color.">
        <Box className="flex flex-wrap gap-6 rounded-xl border border-border bg-surface p-6">
          {Object.entries(typeScale.weight).map(([key, value]) => (
            <Box key={key} className="space-y-1">
              <Box className="text-2xl text-primary" style={{ fontWeight: value as string }}>Ag</Box>
              <Text mono size="sm" tone="muted">{key} · {value}</Text>
            </Box>
          ))}
        </Box>
      </Section>

      <PageDivider />

      <Section title="Families" subtitle="Sans for product surfaces, mono for code and tokens.">
        <Box className="grid gap-4 sm:grid-cols-2">
          <Box className="rounded-xl border border-border bg-surface p-6">
            <Text size="2xl">Inter</Text>
            <Box className="mt-2"><Text size="sm" tone="muted">The interface typeface for every label, heading, and paragraph.</Text></Box>
            <Box className="mt-3 block font-mono text-sm text-tertiary">--wf-font-sans</Box>
          </Box>
          <Box className="rounded-xl border border-border bg-surface p-6">
            <Text mono size="2xl">JetBrains Mono</Text>
            <Box className="mt-2"><Text size="sm" tone="muted">Code blocks, token names, and tabular figures.</Text></Box>
            <Box className="mt-3 block font-mono text-sm text-tertiary">--wf-font-mono</Box>
          </Box>
        </Box>
      </Section>
    </PageLayout>
  )
}
