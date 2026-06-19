import { Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'
import { ExampleComponent } from '../../components/ExampleComponent'

export function StackPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Stack"
      description="A flex Box, the deterministic way to arrange items. direction, gap, align, and justify are a closed vocabulary, so spacing stays on-grid."
    >
      <Section title="Row: give the stack a height" subtitle="A row distributes width; size the cross-axis by giving the Stack a height. The fluid boxes fill it.">
        <Example code={`<Stack direction="row" gap="md" className="h-28">
  <ExampleComponent>1</ExampleComponent>
  <ExampleComponent>2</ExampleComponent>
  <ExampleComponent>3</ExampleComponent>
</Stack>`}>
          <Stack direction="row" gap="md" className="h-28">
            <ExampleComponent>1</ExampleComponent><ExampleComponent>2</ExampleComponent><ExampleComponent>3</ExampleComponent>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Column: give the stack a width" subtitle="A column distributes height; size the cross-axis by giving the Stack a width. The boxes fill that width.">
        <Example code={`<Stack gap="sm" className="w-64">
  <ExampleComponent>First</ExampleComponent>
  <ExampleComponent>Second</ExampleComponent>
  <ExampleComponent>Third</ExampleComponent>
</Stack>`}>
          <Stack gap="sm" className="w-64">
            <ExampleComponent>First</ExampleComponent><ExampleComponent>Second</ExampleComponent><ExampleComponent>Third</ExampleComponent>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
