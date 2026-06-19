import { useState, useEffect } from 'react'
import {
  Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
  CommandSeparator, CommandShortcut, CommandDialog, Button, Box, Stack, Text,
} from '@windforge/ui'
import { File, Settings, User, Plus, Search } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function CommandPage() {
  const [open, setOpen] = useState(false)

  // ⌘K / Ctrl-K opens the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PageLayout
      eyebrow="Components"
      title="Command"
      description="A fast, filterable command menu (cmdk under the hood), token-styled to match the system. Compose it inline, or drop it into CommandDialog for a ⌘K palette."
    >
      <Section title="Inline" subtitle="A standalone, always-open command menu — good for embedding in a panel.">
        <Example
          code={`<Command>
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem><Plus /> New file <CommandShortcut>⌘N</CommandShortcut></CommandItem>
      <CommandItem><Search /> Search <CommandShortcut>⌘F</CommandShortcut></CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem><User /> Profile</CommandItem>
      <CommandItem><Settings /> Preferences</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <Box border="default" borderRadius="xl" className="w-full max-w-md overflow-hidden">
            <Command>
              <CommandInput placeholder="Type a command or search…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem><Plus /> New file <CommandShortcut>⌘N</CommandShortcut></CommandItem>
                  <CommandItem><Search /> Search <CommandShortcut>⌘F</CommandShortcut></CommandItem>
                  <CommandItem><File /> Open document</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem><User /> Profile</CommandItem>
                  <CommandItem><Settings /> Preferences</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Palette (⌘K)" subtitle="CommandDialog centers the menu in an overlay. Try ⌘K / Ctrl-K.">
        <Example
          code={`const [open, setOpen] = useState(false)
// bind ⌘K to setOpen…

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem onSelect={() => setOpen(false)}><Plus /> New file</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
        >
          <Stack gap="sm" align="start">
            <Button variant="secondary" onClick={() => setOpen(true)}>
              <Search /> Open palette <CommandShortcut>⌘K</CommandShortcut>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                  <CommandItem onSelect={() => setOpen(false)}><Plus /> New file</CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}><File /> Open document</CommandItem>
                  <CommandItem onSelect={() => setOpen(false)}><Settings /> Preferences</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
            <Text size="sm" tone="muted">Tip: ⌘K / Ctrl-K toggles it from anywhere on this page.</Text>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
