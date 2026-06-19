import { Text, H1, H2, H3, H4, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function TextPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Text"
      description="The typography primitive. Size, weight, tone, and alignment are a closed token vocabulary; text never renders off-scale. Pair with H1–H6 for document structure; neither needs a raw element or className."
    >
      <Section title="Usage" subtitle="Text renders a <p>; H1–H6 render the semantic headings.">
        <Example code={`import { Text, H1, Stack } from '@windforge/ui'

<Stack gap="sm">
  <H1>Page title</H1>
  <Text tone="muted">Supporting copy that stays quiet.</Text>
</Stack>`}>
          <Stack gap="sm">
            <H1>Page title</H1>
            <Text tone="muted">Supporting copy that stays quiet.</Text>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Headings" subtitle="H1–H6 pick the element and a default size; override size to decouple visual scale from outline.">
        <Example code={`<Stack gap="xs">
  <H1>Heading 1</H1>
  <H2>Heading 2</H2>
  <H3>Heading 3</H3>
  <H4>Heading 4</H4>
</Stack>`}>
          <Stack gap="xs">
            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Sizes" subtitle="The type scale, sm → 6xl.">
        <Example code={`<Stack gap="sm">
  <Text size="sm">The quick brown fox (sm)</Text>
  <Text size="base">The quick brown fox (base)</Text>
  <Text size="xl">The quick brown fox (xl)</Text>
  <Text size="3xl">The quick brown fox (3xl)</Text>
  <Text size="5xl" weight="bold">Aa (5xl)</Text>
</Stack>`}>
          <Stack gap="sm">
            <Text size="sm">The quick brown fox (sm)</Text>
            <Text size="base">The quick brown fox (base)</Text>
            <Text size="xl">The quick brown fox (xl)</Text>
            <Text size="3xl">The quick brown fox (3xl)</Text>
            <Text size="5xl" weight="bold">Aa (5xl)</Text>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Tone" subtitle="Semantic foreground tokens, never raw colors.">
        <Example code={`<Stack gap="xs">
  <Text tone="default">Default, primary content</Text>
  <Text tone="muted">Muted, secondary content</Text>
  <Text tone="subtle">Subtle, tertiary / hints</Text>
  <Text tone="disabled">Disabled</Text>
  <Text tone="brand" weight="semibold">Brand, emphasis</Text>
</Stack>`}>
          <Stack gap="xs">
            <Text tone="default">Default, primary content</Text>
            <Text tone="muted">Muted, secondary content</Text>
            <Text tone="subtle">Subtle, tertiary / hints</Text>
            <Text tone="disabled">Disabled</Text>
            <Text tone="brand" weight="semibold">Brand, emphasis</Text>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Inline code" subtitle={`variant="inline-code" renders a <code> element as a monospace pill, em-sized so it sits inline in running text.`}>
        <Example code={`<Text>
  Set <Text variant="inline-code">defaultOpen</Text> to expand the <Text variant="inline-code">group</Text> on load.
</Text>`}>
          <Text>
            Set <Text variant="inline-code">defaultOpen</Text> to expand the <Text variant="inline-code">group</Text> on load.
          </Text>
        </Example>
      </Section>
    </PageLayout>
  )
}
