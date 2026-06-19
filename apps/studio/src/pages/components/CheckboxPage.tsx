import { useState } from 'react'
import { Checkbox, Label, Stack, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const TASKS = [
  { id: 'design', label: 'Design tokens audited' },
  { id: 'a11y', label: 'Accessibility pass complete' },
  { id: 'docs', label: 'Docs published' },
]

export function CheckboxPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    design: true,
    a11y: false,
    docs: false,
  })

  const allChecked = TASKS.every((t) => checked[t.id])
  const someChecked = TASKS.some((t) => checked[t.id])

  const toggleAll = (next: boolean) =>
    setChecked(Object.fromEntries(TASKS.map((t) => [t.id, next])))

  return (
    <PageLayout
      eyebrow="Components"
      title="Checkbox"
      description="A control for binary and multi-select choices. Radix-backed for keyboard focus, indeterminate state, and form participation."
    >
      <Section title="Usage" subtitle="Pair a Checkbox with a Label in a row and link them with id / htmlFor.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Locked controls keep their checked state but can't be toggled.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm">
  <Checkbox id="locked" defaultChecked disabled />
  <Label htmlFor="locked">Synced (managed by admin)</Label>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm">
            <Checkbox id="locked" defaultChecked disabled />
            <Label htmlFor="locked">Synced (managed by admin)</Label>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Checklist" subtitle="Stack several checkboxes to capture a set of independent choices.">
        <Example
          code={`<Stack gap="sm">
  <Stack direction="row" align="center" gap="sm">
    <Checkbox id="email" defaultChecked />
    <Label htmlFor="email">Email notifications</Label>
  </Stack>
  <Stack direction="row" align="center" gap="sm">
    <Checkbox id="sms" />
    <Label htmlFor="sms">SMS notifications</Label>
  </Stack>
  <Stack direction="row" align="center" gap="sm">
    <Checkbox id="push" defaultChecked />
    <Label htmlFor="push">Push notifications</Label>
  </Stack>
</Stack>`}
        >
          <Stack gap="sm">
            <Stack direction="row" align="center" gap="sm">
              <Checkbox id="email" defaultChecked />
              <Label htmlFor="email">Email notifications</Label>
            </Stack>
            <Stack direction="row" align="center" gap="sm">
              <Checkbox id="sms" />
              <Label htmlFor="sms">SMS notifications</Label>
            </Stack>
            <Stack direction="row" align="center" gap="sm">
              <Checkbox id="push" defaultChecked />
              <Label htmlFor="push">Push notifications</Label>
            </Stack>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Select all" subtitle="A controlled parent checkbox drives and reflects a group of children.">
        <Example
          code={`const allChecked = TASKS.every((t) => checked[t.id])
const someChecked = TASKS.some((t) => checked[t.id])

<Stack gap="sm">
  <Stack direction="row" align="center" gap="sm" className="border-b border-border pb-3">
    <Checkbox
      id="all"
      checked={allChecked ? true : someChecked ? 'indeterminate' : false}
      onCheckedChange={(v) => toggleAll(v === true)}
    />
    <Box className="font-medium">
      <Label htmlFor="all">Release checklist</Label>
    </Box>
  </Stack>
  {TASKS.map((t) => (
    <Stack direction="row" align="center" gap="sm" key={t.id} className="pl-6">
      <Checkbox
        id={t.id}
        checked={checked[t.id]}
        onCheckedChange={(v) =>
          setChecked((p) => ({ ...p, [t.id]: v === true }))
        }
      />
      <Label htmlFor={t.id}>{t.label}</Label>
    </Stack>
  ))}
</Stack>`}
        >
          <Stack gap="sm">
            <Stack direction="row" align="center" gap="sm" className="border-b border-border pb-3">
              <Checkbox
                id="all"
                checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                onCheckedChange={(v) => toggleAll(v === true)}
              />
              <Box className="font-medium">
                <Label htmlFor="all">Release checklist</Label>
              </Box>
            </Stack>
            {TASKS.map((t) => (
              <Stack direction="row" align="center" gap="sm" key={t.id} className="pl-6">
                <Checkbox
                  id={t.id}
                  checked={checked[t.id]}
                  onCheckedChange={(v) =>
                    setChecked((p) => ({ ...p, [t.id]: v === true }))
                  }
                />
                <Label htmlFor={t.id}>{t.label}</Label>
              </Stack>
            ))}
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
