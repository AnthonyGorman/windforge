import { useState } from 'react'
import { Label, Slider, Stack, Box, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SliderPage() {
  const [value, setValue] = useState([60])

  return (
    <PageLayout
      eyebrow="Components"
      title="Slider"
      description="A draggable control for selecting a number or a range within bounds. Keyboard-navigable and snappable to discrete steps, built on Radix."
    >
      <Section title="Usage" subtitle="Pass defaultValue as an array; a single entry yields one thumb.">
        <Example code={`<Box className="w-64">
  <Slider defaultValue={[50]} max={100} step={1} />
</Box>`}>
          <Box className="w-64">
            <Slider defaultValue={[50]} max={100} step={1} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Stepped" subtitle="Set step to snap the thumb to coarse, predictable increments.">
        <Example code={`<Box className="w-64">
  <Slider defaultValue={[40]} max={100} step={20} />
</Box>`}>
          <Box className="w-64">
            <Slider defaultValue={[40]} max={100} step={20} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Range" subtitle="Provide two values to get two thumbs and select a span between them.">
        <Example code={`<Box className="w-64">
  <Slider defaultValue={[20, 80]} max={100} step={1} />
</Box>`}>
          <Box className="w-64">
            <Slider defaultValue={[20, 80]} max={100} step={1} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Controlled" subtitle="Hold the value in state to render it live or sync it elsewhere.">
        <Example
          code={`const [value, setValue] = useState([60])

<Stack gap="sm" className="w-64">
  <Stack direction="row" align="center" justify="between">
    <Label>Volume</Label>
    <Text size="sm" tone="muted">{value[0]}%</Text>
  </Stack>
  <Slider value={value} onValueChange={setValue} max={100} step={1} />
</Stack>`}
        >
          <Stack gap="sm" className="w-64">
            <Stack direction="row" align="center" justify="between">
              <Label>Volume</Label>
              <Text size="sm" tone="muted">{value[0]}%</Text>
            </Stack>
            <Slider value={value} onValueChange={setValue} max={100} step={1} />
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
