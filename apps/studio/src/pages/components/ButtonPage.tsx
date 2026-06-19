import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function ButtonPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Button"
      description="A clickable element that triggers an action. Emphasis comes from a three-tier hierarchy (primary, secondary, tertiary) rather than from hue. destructive is the one semantic exception."
    >
      <Section title="Usage" subtitle="Use primary for the single most important action on a view.">
        <Example live code={`import { Button } from '@windforge/ui'\n\n<Button>Save changes</Button>`} />
      </Section>

      <PageDivider />

      <Section title="Variants" subtitle="Primary through tertiary step down in visual weight. Link and destructive are semantic.">
        <Example
          live
          code={`<Stack direction="row" gap="sm" wrap>
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="tertiary">Tertiary</Button>
  <Button variant="link">Link</Button>
  <Button variant="destructive">Delete</Button>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="Sizes" subtitle="Three sizes plus a square icon size scale padding and type.">
        <Example
          live
          code={`<Stack direction="row" align="center" gap="sm" wrap>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="icon" aria-label="Add"><Plus /></Button>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="With icons" subtitle="A lucide icon passed as a child is auto-sized to the button.">
        <Example
          live
          code={`<Stack direction="row" gap="sm" wrap>
  <Button><Plus /> New item</Button>
  <Button variant="secondary">Download <Download /></Button>
  <Button variant="tertiary"><Trash2 /> Delete</Button>
  <Button variant="link">Learn more <ArrowRight /></Button>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Dimmed and non-interactive across every variant.">
        <Example
          live
          code={`<Stack direction="row" gap="sm" wrap>
  <Button disabled>Primary</Button>
  <Button variant="secondary" disabled>Secondary</Button>
  <Button size="icon" disabled aria-label="favorite"><Heart /></Button>
</Stack>`}
        />
      </Section>
    </PageLayout>
  )
}
