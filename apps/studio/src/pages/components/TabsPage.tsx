import {
  Button,
  Tabs,
  Input,
  Label,
  Stack,
  Box,
  Text,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function TabsPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Tabs"
      description="Switches between related views that share the same space. Pass an items array (value/label/content); set the starting panel with defaultValue."
    >
      <Section title="Basic" subtitle="Two or three panels of content, toggled by a segmented control.">
        <Example
          code={`<Tabs defaultValue="overview" items={[
  { value: 'overview', label: 'Overview', content: (
    <Text size="sm" tone="muted">
      A snapshot of your project: 12 active builds, 3 environments, and a healthy green status.
    </Text>
  ) },
  { value: 'activity', label: 'Activity', content: (
    <Text size="sm" tone="muted">
      Maria deployed to production 2 hours ago. Two pull requests merged earlier today.
    </Text>
  ) },
  { value: 'usage', label: 'Usage', content: (
    <Text size="sm" tone="muted">
      You've used 64% of this month's build minutes. Resets on the 1st.
    </Text>
  ) },
]} />`}
        >
          <Tabs defaultValue="overview" items={[
            { value: 'overview', label: 'Overview', content: (
              <Text size="sm" tone="muted">
                A snapshot of your project: 12 active builds, 3 environments, and a healthy green status across the board.
              </Text>
            ) },
            { value: 'activity', label: 'Activity', content: (
              <Text size="sm" tone="muted">
                Maria deployed to production 2 hours ago. Two pull requests merged earlier today.
              </Text>
            ) },
            { value: 'usage', label: 'Usage', content: (
              <Text size="sm" tone="muted">
                You've used 64% of this month's build minutes. Resets on the 1st.
              </Text>
            ) },
          ]} />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Settings" subtitle="Each tab hosts its own form and save action — content is any ReactNode.">
        <Example
          code={`<Tabs defaultValue="account" items={[
  { value: 'account', label: 'Account', content: <AccountForm /> },
  { value: 'password', label: 'Password', content: <PasswordForm /> },
]} />`}
        >
          <Tabs defaultValue="account" items={[
            { value: 'account', label: 'Account', content: (
              <Box padding="lg" background="surface" border="default" borderRadius="lg">
                <Stack gap="md">
                  <Stack gap="xs">
                    <Label htmlFor="acct-name">Name</Label>
                    <Input id="acct-name" defaultValue="Ada Lovelace" />
                  </Stack>
                  <Stack gap="xs">
                    <Label htmlFor="acct-username">Username</Label>
                    <Input id="acct-username" defaultValue="@ada" />
                  </Stack>
                  <Box className="justify-self-start">
                    <Button>Save account</Button>
                  </Box>
                </Stack>
              </Box>
            ) },
            { value: 'password', label: 'Password', content: (
              <Box padding="lg" background="surface" border="default" borderRadius="lg">
                <Stack gap="md">
                  <Stack gap="xs">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </Stack>
                  <Stack gap="xs">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </Stack>
                  <Box className="justify-self-start">
                    <Button>Update password</Button>
                  </Box>
                </Stack>
              </Box>
            ) },
          ]} />
        </Example>
      </Section>
    </PageLayout>
  )
}
