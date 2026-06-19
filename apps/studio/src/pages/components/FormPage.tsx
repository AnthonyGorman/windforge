import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function FormPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Form"
      description="FormField is the on-system way to assemble a labelled control. For the common case it renders the field for you — pass label, description, placeholder, and type and it owns an Input. To wrap a different control (Textarea, Select, Autocomplete) pass it as the child. Either way FormField generates the ids and wires htmlFor, aria-describedby, aria-invalid, and the required/error state — so accessible, validated forms stay a one-liner and never drift."
    >
      <Section title="Usage" subtitle="Pass label, description, placeholder, and type — FormField renders the Input and wires the ARIA. No child needed.">
        <Example
          live
          code={`import { FormField } from '@windforge/ui'

<Box className="w-full max-w-sm">
  <FormField
    label="Email"
    description="We'll only use this to sign you in."
    type="email"
    placeholder="you@example.com"
    required
  />
</Box>`}
        />
      </Section>

      <PageDivider />

      <Section title="Error state" subtitle="Pass an error and the control flips to invalid. The message stays neutral; the icon and outline carry the hue (state is never color-only).">
        <Example
          live
          code={`<Box className="w-full max-w-sm">
  <FormField label="Workspace URL" error="That workspace name is already taken." />
</Box>`}
        />
      </Section>

      <PageDivider />

      <Section title="Other controls" subtitle="Pass a child to wrap a control other than Input — Textarea, Select, Autocomplete.">
        <Example
          live
          code={`<Stack gap="md" className="w-full max-w-sm">
  <FormField label="Plan" required>
    <Select placeholder="Choose a plan" options={[
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'team', label: 'Team' },
    ]} />
  </FormField>
  <FormField label="Notes" description="Optional — anything we should know." placeholder="Add a note">
    <Textarea rows={3} />
  </FormField>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="In a form" subtitle="Stack FormFields with a clear submit action to compose a complete form.">
        <Example
          live
          code={`<Stack asChild gap="md" className="w-full max-w-sm">
  <form onSubmit={(e) => e.preventDefault()}>
    <FormField label="Full name" placeholder="Ada Lovelace" required />
    <FormField label="Work email" type="email" placeholder="ada@analytical.co" required />
    <Box className="w-full">
      <Button type="submit">Create account</Button>
    </Box>
  </form>
</Stack>`}
        />
      </Section>
    </PageLayout>
  )
}
