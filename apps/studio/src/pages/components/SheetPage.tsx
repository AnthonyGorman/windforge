import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  Input,
  Label,
  Stack,
  SideNav,
} from '@windforge/ui'
import { Home, Inbox, Settings, Users } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SheetPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Sheet"
      description="A panel that slides in from any edge of the screen. Suited to settings, navigation drawers, and detail views that should keep the underlying page in context."
    >
      <Section title="Settings panel" subtitle="The default right-side sheet — title, description, and a sticky footer are props; the form goes in children.">
        <Example
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button>Open settings</Button>
  </SheetTrigger>
  <SheetContent
    side="right"
    title="Workspace settings"
    description="Manage how your workspace appears to collaborators."
    footer={<>
      <Button>Save changes</Button>
      <SheetClose asChild><Button variant="secondary">Cancel</Button></SheetClose>
    </>}
  >
    <Stack gap="md" paddingY="lg">
      <Stack gap="xs">
        <Label htmlFor="ws-name">Workspace name</Label>
        <Input id="ws-name" defaultValue="Windforge HQ" />
      </Stack>
      <Stack gap="xs">
        <Label htmlFor="ws-url">Public URL</Label>
        <Input id="ws-url" defaultValue="windforge.dev/hq" />
      </Stack>
    </Stack>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button>Open settings</Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              title="Workspace settings"
              description="Manage how your workspace appears to collaborators."
              footer={<>
                <Button>Save changes</Button>
                <SheetClose asChild><Button variant="secondary">Cancel</Button></SheetClose>
              </>}
            >
              <Stack gap="md" paddingY="lg">
                <Stack gap="xs">
                  <Label htmlFor="ws-name">Workspace name</Label>
                  <Input id="ws-name" defaultValue="Windforge HQ" />
                </Stack>
                <Stack gap="xs">
                  <Label htmlFor="ws-url">Public URL</Label>
                  <Input id="ws-url" defaultValue="windforge.dev/hq" />
                </Stack>
              </Stack>
            </SheetContent>
          </Sheet>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Navigation drawer" subtitle="A left-side sheet makes a compact menu that mirrors a desktop sidebar on smaller screens.">
        <Example
          code={`const navItems = [
  { label: 'Home', icon: <Home />, path: '/' },
  { label: 'Inbox', icon: <Inbox />, path: '/inbox' },
  { label: 'Team', icon: <Users />, path: '/team' },
  { label: 'Settings', icon: <Settings />, path: '/settings' },
]

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">Menu</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SideNav items={navItems} activePath="/" />
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Menu</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SideNav
                items={[
                  { label: 'Home', icon: <Home />, path: '/' },
                  { label: 'Inbox', icon: <Inbox />, path: '/inbox' },
                  { label: 'Team', icon: <Users />, path: '/team' },
                  { label: 'Settings', icon: <Settings />, path: '/settings' },
                ]}
                activePath="/"
              />
            </SheetContent>
          </Sheet>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Top & bottom" subtitle="Set side to top or bottom for banners, command bars, and mobile action drawers.">
        <Example
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">From top</Button>
  </SheetTrigger>
  <SheetContent
    side="top"
    title="Announcement"
    description="Scheduled maintenance begins tonight at 02:00 UTC."
  />
</Sheet>

<Sheet>
  <SheetTrigger asChild>
    <Button variant="secondary">From bottom</Button>
  </SheetTrigger>
  <SheetContent
    side="bottom"
    title="Share this build"
    description="Choose where to send the preview link."
  />
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">From top</Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              title="Announcement"
              description="Scheduled maintenance begins tonight at 02:00 UTC."
            />
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">From bottom</Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              title="Share this build"
              description="Choose where to send the preview link."
            />
          </Sheet>
        </Example>
      </Section>
    </PageLayout>
  )
}
