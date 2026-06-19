import { Button, ButtonGroup } from '@windforge/ui'
import { Bold, Italic, Underline } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function ButtonGroupPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Button group"
      description="Joins a row of related actions into one segmented control with shared edges, a single outer radius, and collapsed seams. Put any Buttons inside; for selection state, use Toggle button instead."
    >
      <Section title="Usage" subtitle="Mix any button variants; they share borders.">
        <Example code={`<ButtonGroup>
  <Button variant="secondary">Day</Button>
  <Button variant="secondary">Week</Button>
  <Button variant="secondary">Month</Button>
</ButtonGroup>`}>
          <ButtonGroup>
            <Button variant="secondary">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="secondary">Month</Button>
          </ButtonGroup>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Icon actions" subtitle="Great for compact toolbars.">
        <Example code={`<ButtonGroup>
  <Button variant="secondary" size="icon"><Bold /></Button>
  <Button variant="secondary" size="icon"><Italic /></Button>
  <Button variant="secondary" size="icon"><Underline /></Button>
</ButtonGroup>`}>
          <ButtonGroup>
            <Button variant="secondary" size="icon"><Bold /></Button>
            <Button variant="secondary" size="icon"><Italic /></Button>
            <Button variant="secondary" size="icon"><Underline /></Button>
          </ButtonGroup>
        </Example>
      </Section>
    </PageLayout>
  )
}
