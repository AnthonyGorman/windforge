import { Link, Text, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function LinkPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Link"
      description="An inline anchor in the link color (blue), distinct from the brand. Use asChild to wrap a router link while keeping the styling and focus ring."
    >
      <Section title="Usage" subtitle="Inline within running text.">
        <Example code={`import { Link, Text } from '@windforge/ui'

<Text>
  See the <Link href="#">getting-started guide</Link> for setup details.
</Text>`}>
          <Text>
            See the <Link href="#">getting-started guide</Link> for setup details.
          </Text>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Underline" subtitle="Underline on hover (default), always, or never.">
        <Example code={`<Link underline="hover">Hover</Link>
<Link underline="always">Always</Link>
<Link underline="none">None</Link>`}>
          <Stack direction="row" gap="lg">
            <Link href="#" underline="hover">Hover</Link>
            <Link href="#" underline="always">Always</Link>
            <Link href="#" underline="none">None</Link>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With a router" subtitle="asChild forwards the styling onto your router's link component.">
        <Example code={`import { Link as RouterLink } from 'react-router-dom'

<Link asChild><RouterLink to="/theming">Theming</RouterLink></Link>`} />
      </Section>
    </PageLayout>
  )
}
