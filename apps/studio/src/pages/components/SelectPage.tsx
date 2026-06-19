import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Stack,
  Box,
  Text,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SelectPage() {
  const [value, setValue] = useState('')

  return (
    <PageLayout
      eyebrow="Components"
      title="Select"
      description="A trigger that opens a list of mutually exclusive options. Pass an options array for the common case; built on Radix for full keyboard support, typeahead, and a portalled, collision-aware popover."
    >
      <Section title="Usage" subtitle="Pass options and a placeholder — the trigger, value, and items are rendered for you.">
        <Example
          code={`<Box className="w-56">
  <Select
    placeholder="Select a framework"
    options={[
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ]}
  />
</Box>`}
        >
          <Box className="w-56">
            <Select
              placeholder="Select a framework"
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
              ]}
            />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Grouped" subtitle="For groups and labels, compose the primitives directly — the escape hatch.">
        <Example
          code={`<Select>
  <Box className="w-56">
    <SelectTrigger>
      <SelectValue placeholder="Pick a timezone" />
    </SelectTrigger>
  </Box>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="pst">Pacific (PST)</SelectItem>
      <SelectItem value="est">Eastern (EST)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">London (GMT)</SelectItem>
      <SelectItem value="cet">Berlin (CET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        >
          <Select>
            <Box className="w-56">
              <SelectTrigger>
                <SelectValue placeholder="Pick a timezone" />
              </SelectTrigger>
            </Box>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="pst">Pacific (PST)</SelectItem>
                <SelectItem value="est">Eastern (EST)</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">London (GMT)</SelectItem>
                <SelectItem value="cet">Berlin (CET)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Disable the whole control when a choice isn't yet available.">
        <Example
          code={`<Box className="w-56">
  <Select disabled placeholder="Unavailable" options={[{ value: 'a', label: 'Option A' }]} />
</Box>`}
        >
          <Box className="w-56">
            <Select disabled placeholder="Unavailable" options={[{ value: 'a', label: 'Option A' }]} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Controlled" subtitle="Lift the value into state to react to the choice elsewhere on the page.">
        <Example
          code={`const [value, setValue] = useState('')

<Stack gap="sm">
  <Box className="w-56">
    <Select
      value={value}
      onValueChange={setValue}
      placeholder="Choose a plan"
      options={[
        { value: 'starter', label: 'Starter' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise' },
      ]}
    />
  </Box>
  <Text size="sm" tone="muted">Selected: {value || 'none'}</Text>
</Stack>`}
        >
          <Stack gap="sm">
            <Box className="w-56">
              <Select
                value={value}
                onValueChange={setValue}
                placeholder="Choose a plan"
                options={[
                  { value: 'starter', label: 'Starter' },
                  { value: 'pro', label: 'Pro' },
                  { value: 'enterprise', label: 'Enterprise' },
                ]}
              />
            </Box>
            <Text size="sm" tone="muted">
              Selected: {value || 'none'}
            </Text>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
