import { useState } from 'react'
import { Chip, Stack, Text } from '@windforge/ui'
import { Sparkles } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const TAGS = ['Design', 'Engineering', 'Product', 'Sales']

export function ChipPage() {
  const [selected, setSelected] = useState<string[]>(['Design'])
  const [tags, setTags] = useState(['react', 'tailwind', 'radix'])
  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))

  return (
    <PageLayout
      eyebrow="Components"
      title="Chip"
      description="An interactive pill, clickable for filtering/selection and optionally deletable. Distinct from Badge, which is a static label."
    >
      <Section title="Selectable" subtitle="Pass onClick to make a chip a toggle; selected drives the active state.">
        <Example code={`<Chip selected={on} onClick={() => toggle()}>Design</Chip>`}>
          <Stack direction="row" gap="sm" wrap>
            {TAGS.map((t) => (
              <Chip key={t} selected={selected.includes(t)} onClick={() => toggle(t)}>
                {t}
              </Chip>
            ))}
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Deletable" subtitle="onDelete renders a trailing ✕; great for token/tag inputs.">
        <Example code={`<Chip onDelete={() => remove(tag)}>react</Chip>`}>
          <Stack direction="row" gap="sm" wrap>
            {tags.map((t) => (
              <Chip key={t} onDelete={() => setTags((all) => all.filter((x) => x !== t))}>
                {t}
              </Chip>
            ))}
            {tags.length === 0 && <Text size="sm" tone="subtle">All removed. Reload to reset.</Text>}
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With icon" subtitle="A leading icon reinforces meaning.">
        <Example code={`<Chip icon={<Sparkles />} selected onClick={...}>Featured</Chip>`}>
          <Chip icon={<Sparkles />} selected onClick={() => {}}>Featured</Chip>
        </Example>
      </Section>
    </PageLayout>
  )
}
