import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function BadgePage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Badge"
      description="A compact label for status, counts, and metadata. Semantic variants carry meaning through color; neutral and outline stay quiet so they recede into dense layouts."
    >
      <Section title="Usage" subtitle="Use a badge to tag an item without stealing focus from it.">
        <Example live code={`import { Badge } from '@windforge/ui'\n\n<Badge>Beta</Badge>`} />
      </Section>

      <PageDivider />

      <Section title="Variants" subtitle="Eight variants (three structural, five semantic) cover every labeling need.">
        <Example
          live
          code={`<Stack direction="row" gap="sm" wrap>
  <Badge variant="brand">Brand</Badge>
  <Badge variant="subtle">Subtle</Badge>
  <Badge variant="neutral">Neutral</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="Sizes" subtitle="Two sizes; text holds at the sm floor, padding tightens.">
        <Example
          live
          code={`<Stack direction="row" align="center" gap="sm" wrap>
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="With icon" subtitle="A leading lucide icon reinforces meaning at a glance.">
        <Example
          live
          code={`<Stack direction="row" gap="sm" wrap>
  <Badge variant="success"><Check /> Passing</Badge>
  <Badge variant="info"><Sparkles /> New</Badge>
  <Badge variant="warning"><Zap /> Rate limited</Badge>
  <Badge variant="neutral"><GitBranch /> main</Badge>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="In context" subtitle="A badge annotates a row without breaking the reading line.">
        <Example
          live
          code={`<Stack direction="row" align="center" gap="sm" className="text-sm text-primary">
  Deployment <Text size="sm" weight="medium">api-gateway</Text>
  <Badge variant="success">Live</Badge>
  <Text size="sm" tone="subtle">·</Text>
  <Text size="sm" tone="muted">3 replicas</Text>
</Stack>`}
        />
      </Section>
    </PageLayout>
  )
}
