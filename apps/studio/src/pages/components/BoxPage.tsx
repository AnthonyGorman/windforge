import { Box, Grid, Stack, Text, Link } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'
import { ExampleComponent } from '../../components/ExampleComponent'

export function BoxPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Box"
      description="The everyday container, a div with intent-named props. It's how you size and surface a layout: components are fluid, and a Box gives them dimensions, padding, and the box look. Spacing, radius, and shadow are a closed token vocabulary; nothing renders off-scale."
    >
      <Section title="Sizing" subtitle="Give the Box a width/height; the fluid component inside fills it. You size layouts by sizing the Box, never the component.">
        <Example code={`<Box className="h-24 w-64">
  <ExampleComponent>sized by its Box</ExampleComponent>
</Box>`}>
          <Box className="h-24 w-64">
            <ExampleComponent>sized by its Box</ExampleComponent>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Padding" subtitle="padding is an on-scale token step: same inner item, more padding grows the Box around it.">
        <Example code={`<Stack direction="row" align="center" gap="lg">
  <Box padding="none" background="inset" border="default" borderRadius="lg">
    <ExampleComponent className="size-16">none</ExampleComponent>
  </Box>
  <Box padding="sm" background="inset" border="default" borderRadius="lg">
    <ExampleComponent className="size-16">sm</ExampleComponent>
  </Box>
  <Box padding="md" background="inset" border="default" borderRadius="lg">
    <ExampleComponent className="size-16">md</ExampleComponent>
  </Box>
  <Box padding="lg" background="inset" border="default" borderRadius="lg">
    <ExampleComponent className="size-16">lg</ExampleComponent>
  </Box>
</Stack>`}>
          <Stack direction="row" align="center" gap="lg">
            <Box padding="none" background="inset" border="default" borderRadius="lg"><ExampleComponent className="size-16">none</ExampleComponent></Box>
            <Box padding="sm" background="inset" border="default" borderRadius="lg"><ExampleComponent className="size-16">sm</ExampleComponent></Box>
            <Box padding="md" background="inset" border="default" borderRadius="lg"><ExampleComponent className="size-16">md</ExampleComponent></Box>
            <Box padding="lg" background="inset" border="default" borderRadius="lg"><ExampleComponent className="size-16">lg</ExampleComponent></Box>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Surface" subtitle="background, border, radius, and shadow compose the 'box look', each from a token.">
        <Example code={`<Grid cols={1} mdCols={3} gap="md">
  <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="sm">
    <Text size="sm" tone="muted">shadow="sm"</Text>
  </Box>
  <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="md">
    <Text size="sm" tone="muted">shadow="md"</Text>
  </Box>
  <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="lg">
    <Text size="sm" tone="muted">shadow="lg"</Text>
  </Box>
</Grid>`}>
          <Grid cols={1} mdCols={3} gap="md">
            <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="sm">
              <Text size="sm" tone="muted">shadow="sm"</Text>
            </Box>
            <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="md">
              <Text size="sm" tone="muted">shadow="md"</Text>
            </Box>
            <Box padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="lg">
              <Text size="sm" tone="muted">shadow="lg"</Text>
            </Box>
          </Grid>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Polymorphic" subtitle="asChild renders the Box props onto your own element (the on-system replacement for MUI's component=).">
        <Example
          code={`<Box asChild padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="sm" className="block max-w-sm transition-shadow hover:shadow-md">
  <Link href="#">
    <Stack gap="xs">
      <Text weight="semibold">Read the docs</Text>
      <Text size="sm" tone="muted">The whole card is a real anchor — same Box surface, now clickable.</Text>
    </Stack>
  </Link>
</Box>`}
        >
          <Box asChild padding="lg" background="surface" border="default" borderRadius="xl" boxShadow="sm" className="block max-w-sm transition-shadow hover:shadow-md">
            <Link href="#">
              <Stack gap="xs">
                <Text weight="semibold">Read the docs</Text>
                <Text size="sm" tone="muted">The whole card is a real anchor — same Box surface, now clickable.</Text>
              </Stack>
            </Link>
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
