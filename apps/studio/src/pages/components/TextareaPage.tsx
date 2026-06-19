import { useState } from 'react'
import { Label, Textarea, Stack, Box, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function TextareaPage() {
  const [value, setValue] = useState('')
  const max = 280

  return (
    <PageLayout
      eyebrow="Components"
      title="Textarea"
      description="A multi-line text field for comments, descriptions, and free-form input. It grows with the surrounding layout and accepts every native textarea attribute."
    >
      <Section title="Usage" subtitle="Use a textarea wherever a single line isn't enough.">
        <Example code={`import { Textarea } from '@windforge/ui'\n\n<Box className="w-full max-w-sm">\n  <Textarea placeholder="Share your thoughts…" />\n</Box>`}>
          <Box className="w-full max-w-sm">
            <Textarea placeholder="Share your thoughts…" />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With label" subtitle="Connect a Label with htmlFor for an accessible, clickable caption.">
        <Example
          code={`<Stack gap="xs" className="w-full max-w-sm">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us about yourself" />
</Stack>`}
        >
          <Stack gap="xs" className="w-full max-w-sm">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself" />
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Dimmed and read-only while still part of the form's structure.">
        <Example code={`<Box className="w-full max-w-sm">
  <Textarea disabled placeholder="Editing is locked" />
</Box>`}>
          <Box className="w-full max-w-sm">
            <Textarea disabled placeholder="Editing is locked" />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Character count" subtitle="A live helper driven from state gives writers real-time feedback.">
        <Example
          code={`const [value, setValue] = useState('')
const max = 280

<Stack gap="xs">
  <Label htmlFor="status">Status update</Label>
  <Textarea
    id="status"
    value={value}
    maxLength={max}
    onChange={(e) => setValue(e.target.value)}
    placeholder="What's happening?"
  />
  <Text align="right" size="sm" tone="muted">
    {value.length} / {max}
  </Text>
</Stack>`}
        >
          <Stack gap="xs" className="w-full max-w-sm">
            <Label htmlFor="status">Status update</Label>
            <Textarea
              id="status"
              value={value}
              maxLength={max}
              onChange={(e) => setValue(e.target.value)}
              placeholder="What's happening?"
            />
            <Text align="right" size="sm" tone="muted">
              {value.length} / {max}
            </Text>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
