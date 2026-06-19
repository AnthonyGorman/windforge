import { Grid } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'
import { ExampleComponent } from '../../components/ExampleComponent'

export function GridPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Grid"
      description="A closed-vocabulary CSS grid. cols sets the column count, mdCols the count from the md breakpoint up, and gap is on-scale. Children can span with Tailwind col-span utilities."
    >
      <Section title="Responsive columns" subtitle="One column on mobile, three from md up.">
        <Example code={`<Grid cols={1} mdCols={3} gap="md">
  <ExampleComponent>A</ExampleComponent>
  <ExampleComponent>B</ExampleComponent>
  <ExampleComponent>C</ExampleComponent>
</Grid>`}>
          <Grid cols={1} mdCols={3} gap="md">
            <ExampleComponent>A</ExampleComponent><ExampleComponent>B</ExampleComponent><ExampleComponent>C</ExampleComponent>
          </Grid>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Fixed columns" subtitle="cols renders the same count at every width.">
        <Example code={`<Grid cols={4} gap="sm">
  {Array.from({ length: 8 }).map((_, index) => (
    <ExampleComponent key={index}>{index + 1}</ExampleComponent>
  ))}
</Grid>`}>
          <Grid cols={4} gap="sm">
            {Array.from({ length: 8 }).map((_, index) => <ExampleComponent key={index}>{index + 1}</ExampleComponent>)}
          </Grid>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Twelve-column" subtitle="cols={12} with col-span children for asymmetric layouts.">
        <Example code={`<Grid cols={12} gap="sm">
  <ExampleComponent className="col-span-8">col-span-8</ExampleComponent>
  <ExampleComponent className="col-span-4">4</ExampleComponent>
</Grid>`}>
          <Grid cols={12} gap="sm">
            <ExampleComponent className="col-span-8">col-span-8</ExampleComponent>
            <ExampleComponent className="col-span-4">4</ExampleComponent>
          </Grid>
        </Example>
      </Section>
    </PageLayout>
  )
}
