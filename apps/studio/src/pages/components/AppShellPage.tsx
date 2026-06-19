import { Badge, Box, Stack, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function AppShellPage() {
  return (
    <PageLayout
      eyebrow="Layouts"
      title="AppShell"
      description="The layout chrome that wraps an entire application: a persistent sidebar on desktop that collapses to a drawer on mobile, a sticky header, and a scrollable main region. You pass a nav config and your pages, and the shell handles the responsive plumbing."
    >
      <Section title="The layout" subtitle="Three regions: a fixed sidebar, a sticky header across the top of the content, and the scrollable main area below it.">
        <Box padding="none" borderRadius="xl" border="default" className="overflow-hidden">
          <Stack direction="row" gap="none" className="h-72 bg-surface-subtle">
            {/* Sidebar */}
            <Stack gap="sm" className="w-48 shrink-0 border-r border-border bg-surface-inset p-3">
              <Box className="text-sm font-semibold uppercase tracking-wider text-tertiary">SideNav</Box>
              <Box className="rounded-md bg-brand px-2 py-1.5 text-sm font-medium text-contrast">Dashboard</Box>
              <Box className="rounded-md px-2 py-1.5 text-sm text-secondary">Projects</Box>
              <Box className="rounded-md px-2 py-1.5 text-sm text-secondary">Team</Box>
              <Box className="my-1 h-px bg-border" />
              <Box className="rounded-md px-2 py-1.5 text-sm text-secondary">Settings</Box>
            </Stack>
            {/* Header + main */}
            <Stack gap="none" className="flex-1">
              <Stack direction="row" align="center" justify="between" className="border-b border-border bg-surface px-4 py-3">
                <Box className="text-sm font-semibold uppercase tracking-wider text-tertiary">Header</Box>
                <Stack direction="row" align="center" gap="sm">
                  <Box className="h-6 w-24 rounded-md bg-surface-inset" />
                  <Box className="h-6 w-6 rounded-full bg-surface-inset" />
                </Stack>
              </Stack>
              <Box className="flex flex-1 items-center justify-center bg-surface-subtle p-4">
                <Box className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-border text-sm font-medium text-tertiary">
                  main: your routed page content (scrollable)
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Section>

      <PageDivider />

      <Section title="Usage" subtitle="AppShell is the page wrapper. Mount it once at the root and pass an AppBar and SideNav as slots — they're their own components, AppShell just owns the responsive frame.">
        <Example
          language="tsx"
          code={`import { AppShell, AppBar, SideNav, WindforgeLogo } from '@windforge/ui'

<AppShell
  sidebar={
    <SideNav
      items={navItems}
      activePath={pathname}
      onNavigate={(path) => router.push(path)}
      logo={<WindforgeLogo />}
    />
  }
  header={<AppBar title="Dashboard" />}
>
  <YourRoutedPage />
</AppShell>`}
        />
      </Section>

      <PageDivider />

      <Section title="Collapsed by default" subtitle="The desktop sidebar starts expanded. Pass defaultNavOpen={false} to open it collapsed — handy when the nav is secondary, like a personal site — and the AppBar menu button still toggles it.">
        <Example
          language="tsx"
          code={`<AppShell
  defaultNavOpen={false}
  sidebar={<SideNav items={navItems} activePath={pathname} onNavigate={go} />}
  header={<AppBar title="My site" actions={<ModeToggle />} />}
>
  <YourRoutedPage />
</AppShell>`}
        />
      </Section>

      <PageDivider />

      <Section title="Nav config" subtitle="The sidebar is data-driven. Each entry in the nav array is a NavItem, one of four shapes distinguished by its type field.">
        <Example
          language="tsx"
          code={`import { type NavItem } from '@windforge/ui'
import { LayoutDashboard, FolderGit2, Users, Settings } from 'lucide-react'

const navItems: NavItem[] = [
  // A 'section' renders a labeled cluster of items.
  {
    type: 'section',
    label: 'Workspace',
    items: [
      // A leaf 'item' (the default, type is optional) links to a path.
      { type: 'item', label: 'Dashboard', path: '/', icon: <LayoutDashboard /> },
      // A 'group' is collapsible and nests its own children.
      {
        type: 'group',
        label: 'Projects',
        icon: <FolderGit2 />,
        defaultOpen: true,
        children: [
          { label: 'Active', path: '/projects/active' },
          { label: 'Archived', path: '/projects/archived' },
        ],
      },
      { label: 'Team', path: '/team', icon: <Users />, badge: '3' },
    ],
  },
  // A 'divider' draws a rule between clusters.
  { type: 'divider' },
  { label: 'Settings', path: '/settings', icon: <Settings /> },
]`}
        />
      </Section>

      <PageDivider />

      <Section title="NavItem variants" subtitle="Four item shapes compose any sidebar, from a flat list to deeply grouped navigation.">
        <Stack gap="sm">
          <Box padding="md" background="surface" borderRadius="lg" border="default">
            <Stack direction="row" align="start" gap="md">
              <Badge variant="brand">item</Badge>
              <Text size="sm" tone="muted">
                A single link. <Text variant="inline-code">{`{ label, path, icon?, badge?, onClick?, disabled? }`}</Text>.
                The default shape; <Text variant="inline-code">type</Text> may be omitted.
              </Text>
            </Stack>
          </Box>
          <Box padding="md" background="surface" borderRadius="lg" border="default">
            <Stack direction="row" align="start" gap="md">
              <Badge variant="info">group</Badge>
              <Text size="sm" tone="muted">
                A collapsible parent that nests <Text variant="inline-code">children: NavItem[]</Text>.
                Use <Text variant="inline-code">defaultOpen</Text> to expand it on load.
              </Text>
            </Stack>
          </Box>
          <Box padding="md" background="surface" borderRadius="lg" border="default">
            <Stack direction="row" align="start" gap="md">
              <Badge variant="success">section</Badge>
              <Text size="sm" tone="muted">
                A labeled heading over a cluster of <Text variant="inline-code">items: NavItem[]</Text>, the
                top-level organizing unit of the sidebar.
              </Text>
            </Stack>
          </Box>
          <Box padding="md" background="surface" borderRadius="lg" border="default">
            <Stack direction="row" align="start" gap="md">
              <Badge variant="neutral">divider</Badge>
              <Text size="sm" tone="muted">
                A horizontal rule between clusters. <Text variant="inline-code">{`{ type: 'divider' }`}</Text>,
                with no other fields.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Section>
    </PageLayout>
  )
}
