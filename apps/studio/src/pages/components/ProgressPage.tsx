import { Progress, Stack, Box, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

function LabeledProgress() {
  const value = 64
  return (
    <Stack gap="xs" className="w-72">
      <Stack direction="row" justify="between" align="center" className="text-sm">
        <Text size="sm" weight="medium">Uploading assets</Text>
        <Text size="sm" tone="muted">{value}%</Text>
      </Stack>
      <Box className="w-72">
        <Progress value={value} />
      </Box>
    </Stack>
  )
}

export function ProgressPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Progress"
      description="A horizontal bar that communicates how far along a task is. Drive it with a value from 0 to 100; the indicator animates between positions automatically."
    >
      <Section title="Values" subtitle="Set value to any point between 0 and 100, and the bar fills accordingly.">
        <Example
          code={`<Box className="w-72"><Progress value={25} /></Box>
<Box className="w-72"><Progress value={50} /></Box>
<Box className="w-72"><Progress value={75} /></Box>`}
        >
          <Stack gap="lg" className="w-full">
            <Box className="w-72"><Progress value={25} /></Box>
            <Box className="w-72"><Progress value={50} /></Box>
            <Box className="w-72"><Progress value={75} /></Box>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With a label" subtitle="Pair the bar with a label and a percentage so the number is never ambiguous.">
        <Example
          code={`const value = 64

<Stack gap="xs" className="w-72">
  <Stack direction="row" justify="between" align="center" className="text-sm">
    <Text size="sm" weight="medium">Uploading assets</Text>
    <Text size="sm" tone="muted">{value}%</Text>
  </Stack>
  <Box className="w-72"><Progress value={value} /></Box>
</Stack>`}
        >
          <LabeledProgress />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Indeterminate" subtitle="When you can't know the percentage, omit value and set indeterminate for a looping animation.">
        <Example code={`<Box className="w-72"><Progress indeterminate /></Box>`}>
          <Box className="w-72"><Progress indeterminate /></Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
