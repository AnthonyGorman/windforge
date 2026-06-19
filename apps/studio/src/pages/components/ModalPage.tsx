import { useState } from 'react'
import {
  Button, Modal, ModalTrigger, ModalContent, ModalClose,
  Grid, Box, Stack, Text,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function ModalPage() {
  const [open, setOpen] = useState(false)

  return (
    <PageLayout
      eyebrow="Components"
      title="Modal"
      description="The bare, fully composable overlay primitive. Compose ModalTrigger + ModalContent freely and drop in whatever content you like. For the common title/description/actions case, reach for Dialog — it takes those as props."
    >
      <Section title="Composable" subtitle="Put whatever you want inside ModalContent — there are no header/title sub-components.">
        <Example code={`<Modal>
  <ModalTrigger asChild><Button>Open modal</Button></ModalTrigger>
  <ModalContent>
    <Stack gap="xs">
      <Text size="lg" weight="semibold">Keyboard shortcuts</Text>
      <Text size="sm" tone="muted">Speed up common actions.</Text>
    </Stack>
    <Grid cols={2} className="gap-2 text-sm text-secondary">
      <Text size="sm" tone="muted">Search</Text>
      <Box background="inset" className="justify-self-end rounded px-1.5 font-mono">⌘K</Box>
      <Text size="sm" tone="muted">New</Text>
      <Box background="inset" className="justify-self-end rounded px-1.5 font-mono">⌘N</Box>
    </Grid>
    <Stack direction="row" justify="end">
      <ModalClose asChild><Button>Close</Button></ModalClose>
    </Stack>
  </ModalContent>
</Modal>`}>
          <Modal>
            <ModalTrigger asChild><Button>Open modal</Button></ModalTrigger>
            <ModalContent>
              <Stack gap="xs">
                <Text size="lg" weight="semibold">Keyboard shortcuts</Text>
                <Text size="sm" tone="muted">Speed up common actions.</Text>
              </Stack>
              <Grid cols={2} className="gap-2 text-sm text-secondary">
                <Text size="sm" tone="muted">Search</Text>
                <Box background="inset" className="justify-self-end rounded px-1.5 font-mono">⌘K</Box>
                <Text size="sm" tone="muted">New</Text>
                <Box background="inset" className="justify-self-end rounded px-1.5 font-mono">⌘N</Box>
              </Grid>
              <Stack direction="row" justify="end">
                <ModalClose asChild><Button>Close</Button></ModalClose>
              </Stack>
            </ModalContent>
          </Modal>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Sizes & controlled" subtitle="size scales the panel; open/onOpenChange make it controlled.">
        <Example code={`<Modal open={open} onOpenChange={setOpen}>
  <ModalTrigger asChild><Button variant="secondary">Open small</Button></ModalTrigger>
  <ModalContent size="sm">
    <Stack gap="xs">
      <Text size="lg" weight="semibold">Small modal</Text>
      <Text size="sm" tone="muted">size="sm" with a controlled open state.</Text>
    </Stack>
    <Stack direction="row" justify="end">
      <ModalClose asChild><Button>Done</Button></ModalClose>
    </Stack>
  </ModalContent>
</Modal>`}>
          <Modal open={open} onOpenChange={setOpen}>
            <ModalTrigger asChild><Button variant="secondary">Open small</Button></ModalTrigger>
            <ModalContent size="sm">
              <Stack gap="xs">
                <Text size="lg" weight="semibold">Small modal</Text>
                <Text size="sm" tone="muted">size="sm" with a controlled open state.</Text>
              </Stack>
              <Stack direction="row" justify="end">
                <ModalClose asChild><Button>Done</Button></ModalClose>
              </Stack>
            </ModalContent>
          </Modal>
        </Example>
      </Section>
    </PageLayout>
  )
}
