import { Label, RadioGroup, RadioGroupItem, Stack, Box, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function RadioPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Radio group"
      description="A set of mutually exclusive options where exactly one is selected. Use it over a Select when the choices are few and worth showing all at once."
    >
      <Section title="Usage" subtitle="Set a defaultValue, then give every item a value and a matching Label.">
        <Example
          code={`<RadioGroup defaultValue="comfortable">
  <Stack gap="sm">
    <Stack direction="row" align="center" gap="sm">
      <RadioGroupItem value="default" id="r1" />
      <Label htmlFor="r1">Default</Label>
    </Stack>
    <Stack direction="row" align="center" gap="sm">
      <RadioGroupItem value="comfortable" id="r2" />
      <Label htmlFor="r2">Comfortable</Label>
    </Stack>
    <Stack direction="row" align="center" gap="sm">
      <RadioGroupItem value="compact" id="r3" />
      <Label htmlFor="r3">Compact</Label>
    </Stack>
  </Stack>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="comfortable">
            <Stack gap="sm">
              <Stack direction="row" align="center" gap="sm">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </Stack>
              <Stack direction="row" align="center" gap="sm">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </Stack>
              <Stack direction="row" align="center" gap="sm">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </Stack>
            </Stack>
          </RadioGroup>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With descriptions" subtitle="A helper line under each label explains what the choice means.">
        <Example
          code={`<RadioGroup defaultValue="team">
  <Stack gap="md">
    <Stack direction="row" align="start" gap="sm">
      <Box className="mt-0.5">
        <RadioGroupItem value="personal" id="p1" />
      </Box>
      <Stack gap="xs">
        <Label htmlFor="p1">Personal</Label>
        <Text size="sm" tone="muted">For your own projects and prototypes.</Text>
      </Stack>
    </Stack>
    <Stack direction="row" align="start" gap="sm">
      <Box className="mt-0.5">
        <RadioGroupItem value="team" id="p2" />
      </Box>
      <Stack gap="xs">
        <Label htmlFor="p2">Team</Label>
        <Text size="sm" tone="muted">Shared workspaces and role-based access.</Text>
      </Stack>
    </Stack>
  </Stack>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="team">
            <Stack gap="md">
              <Stack direction="row" align="start" gap="sm">
                <Box className="mt-0.5">
                  <RadioGroupItem value="personal" id="p1" />
                </Box>
                <Stack gap="xs">
                  <Label htmlFor="p1">Personal</Label>
                  <Text size="sm" tone="muted">For your own projects and prototypes.</Text>
                </Stack>
              </Stack>
              <Stack direction="row" align="start" gap="sm">
                <Box className="mt-0.5">
                  <RadioGroupItem value="team" id="p2" />
                </Box>
                <Stack gap="xs">
                  <Label htmlFor="p2">Team</Label>
                  <Text size="sm" tone="muted">Shared workspaces and role-based access.</Text>
                </Stack>
              </Stack>
            </Stack>
          </RadioGroup>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Disabled option" subtitle="Disable individual items to show unavailable choices without hiding them.">
        <Example
          code={`<RadioGroup defaultValue="card">
  <Stack gap="sm">
    <Stack direction="row" align="center" gap="sm">
      <RadioGroupItem value="card" id="pay1" />
      <Label htmlFor="pay1">Credit card</Label>
    </Stack>
    <Stack direction="row" align="center" gap="sm">
      <RadioGroupItem value="invoice" id="pay2" disabled />
      <Label htmlFor="pay2">Invoice (Enterprise only)</Label>
    </Stack>
  </Stack>
</RadioGroup>`}
        >
          <RadioGroup defaultValue="card">
            <Stack gap="sm">
              <Stack direction="row" align="center" gap="sm">
                <RadioGroupItem value="card" id="pay1" />
                <Label htmlFor="pay1">Credit card</Label>
              </Stack>
              <Stack direction="row" align="center" gap="sm">
                <RadioGroupItem value="invoice" id="pay2" disabled />
                <Label htmlFor="pay2">Invoice (Enterprise only)</Label>
              </Stack>
            </Stack>
          </RadioGroup>
        </Example>
      </Section>
    </PageLayout>
  )
}
