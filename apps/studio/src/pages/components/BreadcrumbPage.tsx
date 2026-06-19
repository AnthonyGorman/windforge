import { Breadcrumb, Stack } from '@windforge/ui'
import { Home } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function BreadcrumbPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Breadcrumb"
      description="Shows the path to the current page and lets users step back up the hierarchy. Pass an items array; the final crumb is the current page."
    >
      <Section title="Basic" subtitle="A short trail of links ending in the non-interactive current page.">
        <Example
          code={`<Breadcrumb items={[
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Windforge' },
]} />`}
        >
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'Projects', href: '#' },
            { label: 'Windforge' },
          ]} />
        </Example>
      </Section>

      <PageDivider />

      <Section title="With a home icon" subtitle="A crumb's label is a ReactNode, so it can carry an icon.">
        <Example
          code={`<Breadcrumb items={[
  { label: <Stack direction="row" gap="xs" align="center"><Home className="h-3.5 w-3.5" /> Home</Stack>, href: '#' },
  { label: 'Settings', href: '#' },
  { label: 'Billing' },
]} />`}
        >
          <Breadcrumb items={[
            { label: <Stack direction="row" gap="xs" align="center"><Home className="h-3.5 w-3.5" /> Home</Stack>, href: '#' },
            { label: 'Settings', href: '#' },
            { label: 'Billing' },
          ]} />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Deeper trail" subtitle="Breadcrumbs scale to deep hierarchies, mapping a full route segment by segment.">
        <Example
          code={`<Breadcrumb items={[
  { label: 'Home', href: '#' },
  { label: 'Workspaces', href: '#' },
  { label: 'Windforge HQ', href: '#' },
  { label: 'Builds', href: '#' },
  { label: '#4821' },
]} />`}
        >
          <Breadcrumb items={[
            { label: 'Home', href: '#' },
            { label: 'Workspaces', href: '#' },
            { label: 'Windforge HQ', href: '#' },
            { label: 'Builds', href: '#' },
            { label: '#4821' },
          ]} />
        </Example>
      </Section>
    </PageLayout>
  )
}
