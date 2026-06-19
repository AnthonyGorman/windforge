import { useState } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@windforge/ui'
import { CreditCard, LogOut, Settings, User } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function DropdownMenuPage() {
  const [statusBar, setStatusBar] = useState(true)
  const [activityBar, setActivityBar] = useState(false)
  const [panel, setPanel] = useState(false)
  const [position, setPosition] = useState('bottom')

  return (
    <PageLayout
      eyebrow="Components"
      title="Dropdown menu"
      description="A menu of actions and toggles triggered by a button. Built on Radix with full keyboard navigation, typeahead, and roving focus."
    >
      <Section title="Account menu" subtitle="Pass a trigger and an items array — labels, separators, icons, and shortcuts are all declarative.">
        <Example
          code={`<DropdownMenu
  trigger={<Button variant="secondary">My account</Button>}
  items={[
    { type: 'label', label: 'My account' },
    { type: 'separator' },
    { icon: <User />, label: 'Profile', shortcut: '⇧⌘P' },
    { icon: <CreditCard />, label: 'Billing', shortcut: '⌘B' },
    { icon: <Settings />, label: 'Settings', shortcut: '⌘,' },
    { type: 'separator' },
    { icon: <LogOut />, label: 'Log out', shortcut: '⇧⌘Q' },
  ]}
/>`}
        >
          <DropdownMenu
            trigger={<Button variant="secondary">My account</Button>}
            items={[
              { type: 'label', label: 'My account' },
              { type: 'separator' },
              { icon: <User />, label: 'Profile', shortcut: '⇧⌘P' },
              { icon: <CreditCard />, label: 'Billing', shortcut: '⌘B' },
              { icon: <Settings />, label: 'Settings', shortcut: '⌘,' },
              { type: 'separator' },
              { icon: <LogOut />, label: 'Log out', shortcut: '⇧⌘Q' },
            ]}
          />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Checkbox items" subtitle="Toggle independent options in place; each item owns its own controlled checked state.">
        <Example
          code={`const [statusBar, setStatusBar] = useState(true)
const [activityBar, setActivityBar] = useState(false)
const [panel, setPanel] = useState(false)

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
      Status bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={activityBar} onCheckedChange={setActivityBar}>
      Activity bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked={panel} onCheckedChange={setPanel}>
      Panel
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">View</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
                Status bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={activityBar} onCheckedChange={setActivityBar}>
                Activity bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={panel} onCheckedChange={setPanel}>
                Panel
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Radio group" subtitle="Pick exactly one option from a set with a single controlled value.">
        <Example
          code={`const [position, setPosition] = useState('bottom')

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Panel position</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Position</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Panel position</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Example>
      </Section>
    </PageLayout>
  )
}
