import { toast, Button, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function ToastPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Toast"
      description="A transient message (snackbar). Call toast(...) from anywhere; render <Toaster /> once near the app root (Studio already does). Text is the normal foreground; only the icon carries status."
    >
      <Section title="Usage" subtitle="toast() is a plain function. No hook or provider wiring at the call site.">
        <Example code={`import { toast } from '@windforge/ui'

toast({ title: 'Saved', description: 'Your changes are live.' })`}>
          <Button onClick={() => toast({ title: 'Saved', description: 'Your changes are live.' })}>
            Show toast
          </Button>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Variants" subtitle="neutral, success, error, warning, info.">
        <Example code={`toast({ variant: 'success', title: 'Deployed', description: 'v1.4.0 is live.' })
toast({ variant: 'error', title: 'Upload failed', description: 'Check your connection.' })
toast({ variant: 'warning', title: 'Approaching limit' })
toast({ variant: 'info', title: 'New version available' })`}>
          <Stack direction="row" gap="sm" wrap>
            <Button variant="secondary" onClick={() => toast({ variant: 'success', title: 'Deployed', description: 'v1.4.0 is live.' })}>Success</Button>
            <Button variant="secondary" onClick={() => toast({ variant: 'error', title: 'Upload failed', description: 'Check your connection.' })}>Error</Button>
            <Button variant="secondary" onClick={() => toast({ variant: 'warning', title: 'Approaching limit' })}>Warning</Button>
            <Button variant="secondary" onClick={() => toast({ variant: 'info', title: 'New version available' })}>Info</Button>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With an action" subtitle="Pass any node as action; set duration={0} to keep it until dismissed.">
        <Example code={`toast({
  title: 'Item archived',
  action: <Button size="sm" variant="link">Undo</Button>,
  duration: 0,
})`}>
          <Button
            variant="secondary"
            onClick={() => toast({ title: 'Item archived', action: <Button size="sm" variant="link">Undo</Button>, duration: 0 })}
          >
            Archive with undo
          </Button>
        </Example>
      </Section>
    </PageLayout>
  )
}
