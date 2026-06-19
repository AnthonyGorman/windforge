import { Accordion, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function AccordionPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Accordion"
      description="A vertical stack of headers that expand to reveal content. Pass an items array (value/trigger/content). Suited to FAQs and dense settings where one detail needs attention at a time."
    >
      <Section title="FAQ" subtitle="With type='single' and collapsible, opening one panel closes the others, and any panel can be fully closed.">
        <Example
          code={`<Box className="w-full">
  <Accordion type="single" collapsible items={[
    { value: 'item-1', trigger: 'How are builds priced?', content:
      "You're billed per build minute. The first 2,000 minutes each month are included on every plan." },
    { value: 'item-2', trigger: 'Can I bring my own runners?', content:
      "Yes. Self-hosted runners connect over a secure tunnel and appear alongside Windforge's managed fleet." },
    { value: 'item-3', trigger: 'Do you support monorepos?', content:
      'Yes. Affected-package detection means only the projects you touched get rebuilt.' },
  ]} />
</Box>`}
        >
          <Box className="w-full">
            <Accordion type="single" collapsible items={[
              { value: 'item-1', trigger: 'How are builds priced?', content:
                "You're billed per build minute. The first 2,000 minutes each month are included on every plan." },
              { value: 'item-2', trigger: 'Can I bring my own runners?', content:
                "Yes. Self-hosted runners connect over a secure tunnel and appear alongside Windforge's managed fleet." },
              { value: 'item-3', trigger: 'Do you support monorepos?', content:
                'Yes. Affected-package detection means only the projects you touched get rebuilt.' },
            ]} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Multiple open" subtitle="Use type='multiple' to let several panels stay expanded at once for comparing sections side by side.">
        <Example
          code={`<Box className="w-full">
  <Accordion type="multiple" items={[
    { value: 'speed', trigger: 'Speed', content:
      'Incremental caching skips unchanged work, so most pushes build in seconds.' },
    { value: 'security', trigger: 'Security', content:
      'Every build runs in an isolated sandbox with scoped, short-lived credentials.' },
    { value: 'scale', trigger: 'Scale', content:
      'Concurrency grows automatically with demand, with no runner pools to manage.' },
  ]} />
</Box>`}
        >
          <Box className="w-full">
            <Accordion type="multiple" items={[
              { value: 'speed', trigger: 'Speed', content:
                'Incremental caching skips unchanged work, so most pushes build in seconds.' },
              { value: 'security', trigger: 'Security', content:
                'Every build runs in an isolated sandbox with scoped, short-lived credentials.' },
              { value: 'scale', trigger: 'Scale', content:
                'Concurrency grows automatically with demand, with no runner pools to manage.' },
            ]} />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
