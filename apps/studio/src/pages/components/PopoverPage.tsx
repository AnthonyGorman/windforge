import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Label,
  Stack,
  Box,
  Text,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function PopoverPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Popover"
      description="A floating panel anchored to a trigger. Use it for lightweight, non-modal content such as quick edits, help text, and inline settings that don't warrant a full dialog."
    >
      <Section title="Basic" subtitle="Anchor a panel of content to a trigger, here a block of explanatory text.">
        <Example
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">What's new</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Stack gap="xs">
      <Text size="sm" weight="medium">Version 2.4</Text>
      <Text size="sm" tone="muted">
        Faster incremental builds and a redesigned token inspector. Read the full changelog in your dashboard.
      </Text>
    </Stack>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">What's new</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Stack gap="xs">
                <Text size="sm" weight="medium">Version 2.4</Text>
                <Text size="sm" tone="muted">
                  Faster incremental builds and a redesigned token inspector. Read the full changelog in your dashboard.
                </Text>
              </Stack>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Dimensions form" subtitle="A compact inline form to adjust values without losing your place on the canvas.">
        <Example
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button>Set dimensions</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Stack gap="sm">
      <Stack gap="xs">
        <Text size="sm" weight="medium">Dimensions</Text>
        <Text size="sm" tone="muted">Set the size of the selected frame.</Text>
      </Stack>
      <Box className="grid grid-cols-3 items-center gap-3">
        <Label htmlFor="width">Width</Label>
        <Box className="col-span-2 h-8">
          <Input id="width" defaultValue="320" />
        </Box>
      </Box>
      <Box className="grid grid-cols-3 items-center gap-3">
        <Label htmlFor="height">Height</Label>
        <Box className="col-span-2 h-8">
          <Input id="height" defaultValue="200" />
        </Box>
      </Box>
    </Stack>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button>Set dimensions</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Stack gap="sm">
                <Stack gap="xs">
                  <Text size="sm" weight="medium">Dimensions</Text>
                  <Text size="sm" tone="muted">Set the size of the selected frame.</Text>
                </Stack>
                <Box className="grid grid-cols-3 items-center gap-3">
                  <Label htmlFor="width">Width</Label>
                  <Box className="col-span-2 h-8">
                    <Input id="width" defaultValue="320" />
                  </Box>
                </Box>
                <Box className="grid grid-cols-3 items-center gap-3">
                  <Label htmlFor="height">Height</Label>
                  <Box className="col-span-2 h-8">
                    <Input id="height" defaultValue="200" />
                  </Box>
                </Box>
              </Stack>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With an action" subtitle="Pair text with a confirming Button to make a popover a quick, dismissible prompt.">
        <Example
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="tertiary">Invite teammate</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Stack gap="sm">
      <Stack gap="xs">
        <Label htmlFor="invite-email">Email address</Label>
        <Input id="invite-email" type="email" placeholder="colleague@company.com" />
      </Stack>
      <Button size="sm">Send invite</Button>
    </Stack>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="tertiary">Invite teammate</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Stack gap="sm">
                <Stack gap="xs">
                  <Label htmlFor="invite-email">Email address</Label>
                  <Input id="invite-email" type="email" placeholder="colleague@company.com" />
                </Stack>
                <Button size="sm">Send invite</Button>
              </Stack>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>
    </PageLayout>
  )
}
