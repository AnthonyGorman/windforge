import { Button, Dialog, ModalClose, Input, Label, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function DialogPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Dialog"
      description="The opinionated convenience built on Modal: pass title, description, and actions as nodes; body goes in children. For full control over structure, drop down to Modal."
    >
      <Section title="Confirm" subtitle="title / description / actions cover the common confirm case.">
        <Example code={`<Dialog
  trigger={<Button variant="destructive">Delete project</Button>}
  title="Delete project?"
  description="This permanently removes the project and its data. This can't be undone."
  actions={<>
    <ModalClose asChild><Button variant="secondary">Cancel</Button></ModalClose>
    <ModalClose asChild><Button variant="destructive">Delete</Button></ModalClose>
  </>}
/>`}>
          <Dialog
            trigger={<Button variant="destructive">Delete project</Button>}
            title="Delete project?"
            description="This permanently removes the project and its data. This can't be undone."
            actions={
              <>
                <ModalClose asChild><Button variant="secondary">Cancel</Button></ModalClose>
                <ModalClose asChild><Button variant="destructive">Delete</Button></ModalClose>
              </>
            }
          />
        </Example>
      </Section>

      <PageDivider />

      <Section title="With a body" subtitle="children render between the header and the actions footer.">
        <Example code={`<Dialog trigger={<Button>Invite teammate</Button>} title="Invite teammate"
  description="They'll get an email to join your workspace."
  actions={<ModalClose asChild><Button>Send invite</Button></ModalClose>}>
  <Stack gap="sm">
    <Label htmlFor="email">Email</Label>
    <Input id="email" placeholder="teammate@acme.com" />
  </Stack>
</Dialog>`}>
          <Dialog
            trigger={<Button>Invite teammate</Button>}
            title="Invite teammate"
            description="They'll get an email to join your workspace."
            actions={<ModalClose asChild><Button>Send invite</Button></ModalClose>}
          >
            <Stack gap="sm">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="teammate@acme.com" />
            </Stack>
          </Dialog>
        </Example>
      </Section>
    </PageLayout>
  )
}
