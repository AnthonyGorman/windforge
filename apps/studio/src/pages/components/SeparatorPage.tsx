import { Separator, Stack, Box, Link, Text, H4 } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SeparatorPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Separator"
      description="A thin rule that visually divides content. It is decorative by default but renders the correct ARIA role, and it flips between a horizontal line and a vertical one with the orientation prop."
    >
      <Section title="Horizontal" subtitle="The default. A full-width line breaks a stack of content into sections.">
        <Example
          code={`<Box className="w-80">
  <Box>
    <H4 size="sm" weight="medium">Windforge UI</H4>
    <Text size="sm" tone="muted">A token-driven component library.</Text>
  </Box>
  <Box className="my-4"><Separator /></Box>
  <Text size="sm" tone="muted">
    Built on Radix primitives and styled entirely with semantic tokens.
  </Text>
</Box>`}
        >
          <Box className="w-80">
            <Box>
              <H4 size="sm" weight="medium">Windforge UI</H4>
              <Text size="sm" tone="muted">A token-driven component library.</Text>
            </Box>
            <Box className="my-4"><Separator /></Box>
            <Text size="sm" tone="muted">
              Built on Radix primitives and styled entirely with semantic tokens.
            </Text>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Vertical" subtitle="Set orientation to vertical inside a flex row. The row needs a height for the rule to span.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm" className="h-5 text-sm">
  <Link href="#">Docs</Link>
  <Separator orientation="vertical" />
  <Link href="#">Source</Link>
  <Separator orientation="vertical" />
  <Link href="#">Blog</Link>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm" className="h-5 text-sm">
            <Link href="#">Docs</Link>
            <Separator orientation="vertical" />
            <Link href="#">Source</Link>
            <Separator orientation="vertical" />
            <Link href="#">Blog</Link>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="In a toolbar" subtitle="Vertical rules group related controls and mark where one cluster ends and the next begins.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm" className="h-5 text-sm text-secondary">
  <Text size="sm" weight="medium">main</Text>
  <Separator orientation="vertical" />
  <Text size="sm" tone="muted">12 commits</Text>
  <Separator orientation="vertical" />
  <Text size="sm" tone="muted">updated 2h ago</Text>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm" className="h-5 text-sm text-secondary">
            <Text size="sm" weight="medium">main</Text>
            <Separator orientation="vertical" />
            <Text size="sm" tone="muted">12 commits</Text>
            <Separator orientation="vertical" />
            <Text size="sm" tone="muted">updated 2h ago</Text>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
