import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function InputPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Input"
      description="A single-line text field for forms. It takes standard HTML input props. To add a label, helper text, a required marker, and the error state with correct ids and ARIA, wrap it in a FormField — see the Form page."
    >
      <Section title="Usage" subtitle="A bare input works anywhere; give it a placeholder for context.">
        <Example live code={`import { Input } from '@windforge/ui'\n\n<Input placeholder="Search projects" />`} />
      </Section>

      <PageDivider />

      <Section title="Types" subtitle="Pass any HTML input type — text, email, password, number, and so on.">
        <Example
          live
          code={`<Stack gap="md" className="w-full max-w-sm">
  <Input type="email" placeholder="you@example.com" />
  <Input type="password" placeholder="Password" />
  <Input type="number" placeholder="0" />
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="Invalid" subtitle="The invalid prop flips the control to a red outline and sets aria-invalid. FormField sets this for you when given an error.">
        <Example
          live
          code={`<Box className="w-full max-w-sm">
  <Input invalid defaultValue="acme" />
</Box>`}
        />
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Dims and disables the field.">
        <Example
          live
          code={`<Box className="w-full max-w-sm">
  <Input disabled placeholder="Unavailable" />
</Box>`}
        />
      </Section>
    </PageLayout>
  )
}
