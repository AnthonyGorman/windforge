import { useState } from 'react'
import { MultiSelect, FormField, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik' },
]

export function MultiSelectPage() {
  const [value, setValue] = useState<string[]>(['react', 'svelte'])
  const [tags, setTags] = useState<string[]>([])
  return (
    <PageLayout
      eyebrow="Components"
      title="MultiSelect"
      description="A searchable multi-value combobox. Selected values render as removable tags; the dropdown filters as you type and toggles with the keyboard. Shares the Radix popper and floating-panel recipe with Select and Autocomplete."
    >
      <Section title="Usage" subtitle="Type to filter, Enter to toggle, Backspace to remove the last tag.">
        <Example
          code={`const [value, setValue] = useState(['react', 'svelte'])

<MultiSelect options={frameworks} value={value} onValueChange={setValue} />`}
        >
          <Box className="w-full max-w-sm">
            <MultiSelect options={frameworks} value={value} onValueChange={setValue} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="In a FormField" subtitle="Wrap it like any control to get the label, helper text, and ARIA wiring.">
        <Example
          code={`<FormField label="Stack" description="Pick everything your team uses.">
  <MultiSelect options={frameworks} value={tags} onValueChange={setTags} />
</FormField>`}
        >
          <Box className="w-full max-w-sm">
            <FormField label="Stack" description="Pick everything your team uses.">
              <MultiSelect options={frameworks} value={tags} onValueChange={setTags} />
            </FormField>
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
