import { useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Stack, Text } from '@windforge/ui'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function ToggleButtonPage() {
  const [align, setAlign] = useState<string | null>('left')
  const [marks, setMarks] = useState<string[]>(['bold'])

  return (
    <PageLayout
      eyebrow="Components"
      title="Toggle button"
      description="A segmented control with selection state. type='single' keeps one value selected; type='multiple' keeps an array. Controlled via value + onValueChange."
    >
      <Section title="Single" subtitle="One value at a time. Re-clicking the active button clears it.">
        <Example code={`<ToggleButtonGroup value={align} onValueChange={setAlign}>
  <ToggleButton value="left"><AlignLeft /></ToggleButton>
  <ToggleButton value="center"><AlignCenter /></ToggleButton>
  <ToggleButton value="right"><AlignRight /></ToggleButton>
</ToggleButtonGroup>`}>
          <ToggleButtonGroup value={align} onValueChange={setAlign}>
            <ToggleButton value="left"><AlignLeft /></ToggleButton>
            <ToggleButton value="center"><AlignCenter /></ToggleButton>
            <ToggleButton value="right"><AlignRight /></ToggleButton>
          </ToggleButtonGroup>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Multiple" subtitle="type='multiple' tracks any number of pressed values.">
        <Example code={`<Stack gap="sm">
  <ToggleButtonGroup type="multiple" value={marks} onValueChange={setMarks}>
    <ToggleButton value="bold"><Bold /></ToggleButton>
    <ToggleButton value="italic"><Italic /></ToggleButton>
    <ToggleButton value="underline"><Underline /></ToggleButton>
  </ToggleButtonGroup>
  <Text size="sm" tone="muted">Active: {marks.join(', ') || 'none'}</Text>
</Stack>`}>
          <Stack gap="sm">
            <ToggleButtonGroup type="multiple" value={marks} onValueChange={setMarks}>
              <ToggleButton value="bold"><Bold /></ToggleButton>
              <ToggleButton value="italic"><Italic /></ToggleButton>
              <ToggleButton value="underline"><Underline /></ToggleButton>
            </ToggleButtonGroup>
            <Text size="sm" tone="muted">Active: {marks.join(', ') || 'none'}</Text>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
