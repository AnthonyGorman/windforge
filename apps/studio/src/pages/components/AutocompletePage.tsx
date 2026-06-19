import { useState } from 'react'
import { Autocomplete, Label, Stack, Text, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const FRAMEWORKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik' },
  { value: 'astro', label: 'Astro' },
]

export function AutocompletePage() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <PageLayout
      eyebrow="Components"
      title="Autocomplete"
      description="A searchable single-select combobox. Type to filter; arrow keys move the highlight, Enter selects, Escape closes. Controlled via value + onValueChange."
    >
      <Section title="Usage">
        <Example code={`const [value, setValue] = useState(null)

<Stack gap="sm" className="max-w-xs">
  <Label>Framework</Label>
  <Autocomplete
    options={frameworks}
    value={value}
    onValueChange={setValue}
    placeholder="Search frameworks…"
  />
  <Text size="sm" tone="muted">Selected: {value ?? 'none'}</Text>
</Stack>`}>
          <Stack gap="sm" className="max-w-xs">
            <Label>Framework</Label>
            <Autocomplete options={FRAMEWORKS} value={value} onValueChange={setValue} placeholder="Search frameworks…" />
            <Text size="sm" tone="muted">Selected: {value ?? 'none'}</Text>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Keyboard" subtitle="↑/↓ to move, Enter to select, Esc to close. Fully operable without a mouse.">
        <Example code={`// Arrow keys move the highlight, Enter selects, Esc closes.
<Box className="max-w-xs">
  <Autocomplete options={frameworks} placeholder="Try typing 's'…" />
</Box>`}>
          <Box className="max-w-xs">
            <Autocomplete options={FRAMEWORKS} placeholder="Try typing 's'…" />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
