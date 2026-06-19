import { radius, elevation, motion, Box, Stack, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'

export function RadiusPage() {
  return (
    <PageLayout
      eyebrow="Foundations"
      title="Radius & elevation"
      description="Corner radius, shadow elevation, and motion are also tokens. They define the system's physical feel: soft corners, layered surfaces, and consistent, restrained motion."
    >
      <Section title="Radius" subtitle="A geometric scale from hairline to pill. Each is a --wf-radius-* token.">
        <Box className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {Object.entries(radius).map(([key, value]) => (
            <Stack key={key} align="center" gap="sm">
              <Box className="h-20 w-20 border-2 border-brand bg-brand-subtle" style={{ borderRadius: `var(--wf-radius-${key})` }} />
              <Box className="text-center">
                <Text mono size="sm" tone="brand">{key}</Text>
                <Text mono size="sm" tone="subtle">{value}</Text>
              </Box>
            </Stack>
          ))}
        </Box>
      </Section>

      <PageDivider />

      <Section title="Elevation" subtitle="Shadows establish layering. Heavier elevation reads as closer to the user and more transient.">
        <Box className="grid grid-cols-2 gap-6 rounded-xl bg-surface-subtle p-8 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(elevation).filter(([k]) => k !== 'none').map(([key]) => (
            <Stack key={key} align="center" gap="sm">
              <Box className="flex h-20 w-full items-center justify-center rounded-xl bg-surface text-sm text-secondary" style={{ boxShadow: `var(--wf-shadow-${key})` }}>
                {key}
              </Box>
              <Text mono size="sm" tone="subtle">shadow-{key}</Text>
            </Stack>
          ))}
        </Box>
      </Section>

      <PageDivider />

      <Section title="Motion" subtitle="Durations and easings are tokens, so the system animates consistently.">
        <Box className="grid gap-3 sm:grid-cols-2">
          <Box className="rounded-xl border border-border bg-surface p-5">
            <Box className="mb-3 text-sm font-semibold text-primary">Duration</Box>
            <Box className="space-y-1.5">
              {Object.entries(motion.duration).map(([k, v]) => (
                <Stack key={k} direction="row" justify="between" gap="none" className="font-mono text-sm">
                  <Box className="text-brand">{k}</Box><Box className="text-tertiary">{v}</Box>
                </Stack>
              ))}
            </Box>
          </Box>
          <Box className="rounded-xl border border-border bg-surface p-5">
            <Box className="mb-3 text-sm font-semibold text-primary">Easing</Box>
            <Box className="space-y-1.5">
              {Object.entries(motion.easing).map(([k, v]) => (
                <Stack key={k} direction="row" justify="between" className="gap-4 font-mono text-sm">
                  <Box className="text-brand">{k}</Box><Box className="truncate text-tertiary">{v}</Box>
                </Stack>
              ))}
            </Box>
          </Box>
        </Box>
      </Section>
    </PageLayout>
  )
}
