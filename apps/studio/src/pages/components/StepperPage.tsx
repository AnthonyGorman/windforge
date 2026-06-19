import { useState } from 'react'
import { Stepper, Button, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const STEPS = [
  { label: 'Account', description: 'Your details' },
  { label: 'Workspace', description: 'Name & plan' },
  { label: 'Invite', description: 'Add teammates' },
  { label: 'Done' },
]

export function StepperPage() {
  const [active, setActive] = useState(1)

  return (
    <PageLayout
      eyebrow="Components"
      title="Stepper"
      description="Progress through a sequence of steps. Earlier steps complete (✓), the current step is highlighted, later steps stay quiet. Horizontal or vertical."
    >
      <Section title="Horizontal" subtitle="activeStep is the 0-based current index.">
        <Example code={`<Stack gap="lg">
  <Stepper steps={steps} activeStep={active} />
  <Stack direction="row" gap="sm">
    <Button variant="secondary" size="sm" onClick={() => setActive((s) => Math.max(0, s - 1))}>Back</Button>
    <Button size="sm" onClick={() => setActive((s) => Math.min(steps.length - 1, s + 1))}>Next</Button>
  </Stack>
</Stack>`}>
          <Stack gap="lg">
            <Stepper steps={STEPS} activeStep={active} />
            <Stack direction="row" gap="sm">
              <Button variant="secondary" size="sm" onClick={() => setActive((s) => Math.max(0, s - 1))}>Back</Button>
              <Button size="sm" onClick={() => setActive((s) => Math.min(STEPS.length - 1, s + 1))}>Next</Button>
            </Stack>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Vertical" subtitle="orientation='vertical' stacks the steps with connecting rails.">
        <Example code={`<Stepper orientation="vertical" steps={steps} activeStep={2} />`}>
          <Stepper orientation="vertical" steps={STEPS} activeStep={2} />
        </Example>
      </Section>
    </PageLayout>
  )
}
