import { AppBar, ModeToggle, Box, Stack, Text, Button } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

// A scrollable frame so the sticky bar has content passing under it — the only
// way the glass frost actually reads. The body is intentionally tall.
function BarDemo({
  variant,
  color,
}: {
  variant?: 'glass' | 'solid'
  color?: 'surface' | 'subtle' | 'inset'
}) {
  return (
    // Square frame — an app bar spans the full top edge, so the demo keeps its
    // corners square rather than tucking the bar into a rounded card.
    <Box border="default" borderRadius="none" className="overflow-hidden">
      <Box className="h-56 overflow-y-auto bg-surface-subtle">
        <AppBar
          variant={variant}
          color={color}
          title="Dashboard"
          onMenuClick={() => {}}
          actions={<>
            <Button size="sm" variant="secondary">Deploy</Button>
            <ModeToggle />
          </>}
        />
        <Stack gap="sm" className="p-4">
          {['Revenue', 'Active users', 'Pipeline', 'Latency', 'Error rate', 'Open tickets'].map((label) => (
            <Stack key={label} direction="row" align="center" justify="between"
              className="rounded-lg border border-border bg-surface px-4 py-3">
              <Text size="sm" weight="medium">{label}</Text>
              <Box className="h-2 w-24 rounded-full bg-brand-muted" />
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export function AppBarPage() {
  return (
    <PageLayout
      eyebrow="Layouts"
      title="AppBar"
      description="The sticky top bar of an AppShell: a menu toggle, an optional logo and title, and trailing actions. The light/dark switch is the ModeToggle component, passed in as an action rather than baked in. Choose the surface treatment with variant, and override the surface it sits on with color. Scroll the previews to see content pass under the bar."
    >
      <Section
        title="Glass (default)"
        subtitle="A translucent, blurred surface — content frosts as it scrolls beneath. This is the treatment used at the top of Studio."
      >
        <Example
          code={`<AppBar
  title="Dashboard"
  actions={<>
    <Button size="sm" variant="secondary">Deploy</Button>
    <ModeToggle />
  </>}
/>`}
        >
          <Box className="w-full">
            <BarDemo variant="glass" />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section
        title="Solid"
        subtitle="A flat, opaque bar — no blur or transparency, for a calmer, cleaner chrome."
      >
        <Example
          code={`<AppBar
  variant="solid"
  title="Dashboard"
  actions={<>
    <Button size="sm" variant="secondary">Deploy</Button>
    <ModeToggle />
  </>}
/>`}
        >
          <Box className="w-full">
            <BarDemo variant="solid" />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section
        title="Color override"
        subtitle="`color` swaps the surface token the bar sits on — surface (default), subtle, or inset — under either variant. Useful when the bar should read distinctly from the page behind it."
      >
        <Example
          code={`// Solid bar on the inset surface
<AppBar variant="solid" color="inset" title="Dashboard" />`}
        >
          <Box className="w-full">
            <BarDemo variant="solid" color="inset" />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
