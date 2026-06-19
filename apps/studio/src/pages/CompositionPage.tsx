/**
 * CompositionPage: a billing & account settings panel built entirely
 * component-first: only Windforge components + intent props, zero raw HTML
 * elements (className only on Box/Stack for the rare arbitrary need).
 *
 * Demonstrates: Stack/Grid/Box for layout · H1–H6/Text for type ·
 * Card, Badge, Button, Input, Switch, Select, Separator, Avatar,
 * Progress, Alert, Tabs, Breadcrumb, all with no hand-styling.
 */

import { useState } from 'react'
import {
  Stack,
  Grid,
  Box,
  H2,
  H3,
  Text,
  Card,
  Button,
  Badge,
  Input,
  Label,
  Switch,
  Select,
  Tabs,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Progress,
  Alert,
  Separator,
  Breadcrumb,
} from '@windforge/ui'
import {
  CreditCard,
  Zap,
  ShieldCheck,
  Bell,
  Users,
  TrendingUp,
  AlertTriangle,
  Check,
} from 'lucide-react'
import { PageLayout, Section } from '../components/PageLayout'
import { Example } from '../components/Example'

// ── Stat card used in the billing overview grid ────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string
  value: string
  sub: string
  icon: React.ElementType
}) {
  return (
    <Card>
      <Stack gap="sm">
        <Stack direction="row" align="center" justify="between">
          <Text size="sm" tone="muted" weight="medium">{label}</Text>
          <Box padding="xs" background="subtle" borderRadius="md">
            <Icon className="h-4 w-4 text-brand" />
          </Box>
        </Stack>
        <H3 size="2xl">{value}</H3>
        <Text size="sm" tone="muted">{sub}</Text>
      </Stack>
    </Card>
  )
}

// ── Invoice row ────────────────────────────────────────────────────────────
function InvoiceRow({
  date,
  amount,
  status,
}: {
  date: string
  amount: string
  status: 'paid' | 'pending'
}) {
  return (
    <Stack direction="row" align="center" justify="between" paddingY="sm">
      <Stack direction="row" align="center" gap="md">
        <Box
          background="subtle"
          borderRadius="md"
          padding="sm"
          className="hidden sm:flex"
        >
          <CreditCard className="h-4 w-4 text-brand" />
        </Box>
        <Stack gap="none">
          <Text size="sm" weight="medium">Windforge Pro</Text>
          <Text size="sm" tone="muted">{date}</Text>
        </Stack>
      </Stack>
      <Stack direction="row" align="center" gap="md">
        <Text weight="semibold">{amount}</Text>
        <Badge variant={status === 'paid' ? 'success' : 'warning'}>
          {status === 'paid' ? 'Paid' : 'Pending'}
        </Badge>
        <Button variant="tertiary" size="sm">PDF</Button>
      </Stack>
    </Stack>
  )
}

// ── Notification preference row ────────────────────────────────────────────
function NotifRow({
  label,
  description,
  defaultChecked = false,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <Stack direction="row" align="start" justify="between" gap="xl">
      <Stack gap="none" className="flex-1">
        <Text weight="medium">{label}</Text>
        <Text size="sm" tone="muted">{description}</Text>
      </Stack>
      <Switch
        checked={checked}
        onCheckedChange={setChecked}
        aria-label={label}
      />
    </Stack>
  )
}

const TIMEZONES = [
  { value: 'utc', label: 'UTC' },
  { value: 'est', label: 'Eastern (UTC−5)' },
  { value: 'pst', label: 'Pacific (UTC−8)' },
  { value: 'cet', label: 'Central European (UTC+1)' },
]

// ── The displayed source sample — mirrors the live tree below verbatim ───────
const BILLING_JSX = `<Stack gap="lg">
  <Breadcrumb items={[
    { label: 'Dashboard', href: '#' },
    { label: 'Account settings' },
  ]} />

  <H2 size="2xl">Account settings</H2>

  <Tabs
    value={billingTab}
    onValueChange={setBillingTab}
    items={[
      { value: 'billing', label: 'Billing', content: billingTab_content },
      { value: 'profile', label: 'Profile', content: profileTab_content },
      { value: 'notifications', label: 'Notifications', content: notificationsTab_content },
    ]}
  />
</Stack>

// billingTab_content — stat cards, a usage bar, plan + payment + invoices
<Stack gap="lg">
  <Alert
    variant="warning"
    icon={<AlertTriangle />}
    title="Approaching seat limit"
    description="You are using 8 of 10 seats on the Pro plan. Upgrade to add more team members."
  />

  <Grid cols={1} mdCols={3} gap="card">
    <StatCard label="Monthly spend" value="$232" sub="+$29 next cycle" icon={CreditCard} />
    <StatCard label="Seats used" value="8 / 10" sub="2 seats remaining" icon={Users} />
    <StatCard label="API calls" value="1.2 M" sub="80% of 1.5 M limit" icon={Zap} />
  </Grid>

  {/* Seat usage bar */}
  <Card>
    <Stack gap="sm">
      <Stack direction="row" justify="between" align="center">
        <Text weight="semibold">Seat usage</Text>
        <Text size="sm" tone="muted">8 / 10</Text>
      </Stack>
      <Progress value={80} />
      <Text size="sm" tone="muted">
        2 seats remain. Add seats or upgrade to Business.
      </Text>
    </Stack>
  </Card>

  {/* Current plan */}
  <Card
    title="Current plan"
    headerAction={<Badge variant="brand">Pro</Badge>}
    description="Billed monthly · next invoice Jun 1, 2026"
    footer={<Stack direction="row" gap="sm">
      <Button>Upgrade plan</Button>
      <Button variant="secondary">View all plans</Button>
    </Stack>}
  >
    <Stack gap="sm">
      <Stack direction="row" align="center" gap="sm">
        <Check className="h-4 w-4 text-success" />
        <Text size="sm">10 seats included</Text>
      </Stack>
      <Stack direction="row" align="center" gap="sm">
        <Check className="h-4 w-4 text-success" />
        <Text size="sm">1.5 M API calls / month</Text>
      </Stack>
      <Stack direction="row" align="center" gap="sm">
        <Check className="h-4 w-4 text-success" />
        <Text size="sm">Priority email support</Text>
      </Stack>
      <Stack direction="row" align="center" gap="sm">
        <TrendingUp className="h-4 w-4 text-brand" />
        <Text size="sm" tone="brand" weight="medium">
          Upgrade to Business for 50 seats + SSO
        </Text>
      </Stack>
    </Stack>
  </Card>

  {/* Payment method */}
  <Card
    title="Payment method"
    headerAction={<Badge variant="neutral">Default</Badge>}
    description="Used for all future invoices."
    footer={<Button variant="secondary" size="sm">Update card</Button>}
  >
    <Stack direction="row" align="center" gap="md">
      <Box background="subtle" borderRadius="md" padding="sm">
        <CreditCard className="h-5 w-5 text-brand" />
      </Box>
      <Stack gap="none" className="flex-1">
        <Text weight="medium">Visa ending ···· 4242</Text>
        <Text size="sm" tone="muted">Expires 08 / 2027</Text>
      </Stack>
      <Badge variant="success">
        <ShieldCheck className="h-3 w-3" />
        Verified
      </Badge>
    </Stack>
  </Card>

  {/* Invoice history */}
  <Card title="Invoice history" description="Download PDFs for your records.">
    <Stack gap="none">
      <InvoiceRow date="Jun 1, 2026" amount="$232.00" status="pending" />
      <Separator />
      <InvoiceRow date="May 1, 2026" amount="$203.00" status="paid" />
      <Separator />
      <InvoiceRow date="Apr 1, 2026" amount="$203.00" status="paid" />
      <Separator />
      <InvoiceRow date="Mar 1, 2026" amount="$174.00" status="paid" />
    </Stack>
  </Card>
</Stack>`

export function CompositionPage() {
  const [billingTab, setBillingTab] = useState('billing')

  const billingTab_content = (
    <Stack gap="lg">
      <Alert
        variant="warning"
        icon={<AlertTriangle />}
        title="Approaching seat limit"
        description="You are using 8 of 10 seats on the Pro plan. Upgrade to add more team members."
      />

      <Grid cols={1} mdCols={3} gap="card">
        <StatCard label="Monthly spend" value="$232" sub="+$29 next cycle" icon={CreditCard} />
        <StatCard label="Seats used" value="8 / 10" sub="2 seats remaining" icon={Users} />
        <StatCard label="API calls" value="1.2 M" sub="80% of 1.5 M limit" icon={Zap} />
      </Grid>

      {/* Seat usage bar */}
      <Card>
        <Stack gap="sm">
          <Stack direction="row" justify="between" align="center">
            <Text weight="semibold">Seat usage</Text>
            <Text size="sm" tone="muted">8 / 10</Text>
          </Stack>
          <Progress value={80} />
          <Text size="sm" tone="muted">
            2 seats remain. Add seats or upgrade to Business.
          </Text>
        </Stack>
      </Card>

      {/* Current plan */}
      <Card
        title="Current plan"
        headerAction={<Badge variant="brand">Pro</Badge>}
        description="Billed monthly · next invoice Jun 1, 2026"
        footer={<Stack direction="row" gap="sm">
          <Button>Upgrade plan</Button>
          <Button variant="secondary">View all plans</Button>
        </Stack>}
      >
        <Stack gap="sm">
          <Stack direction="row" align="center" gap="sm">
            <Check className="h-4 w-4 text-success" />
            <Text size="sm">10 seats included</Text>
          </Stack>
          <Stack direction="row" align="center" gap="sm">
            <Check className="h-4 w-4 text-success" />
            <Text size="sm">1.5 M API calls / month</Text>
          </Stack>
          <Stack direction="row" align="center" gap="sm">
            <Check className="h-4 w-4 text-success" />
            <Text size="sm">Priority email support</Text>
          </Stack>
          <Stack direction="row" align="center" gap="sm">
            <TrendingUp className="h-4 w-4 text-brand" />
            <Text size="sm" tone="brand" weight="medium">
              Upgrade to Business for 50 seats + SSO
            </Text>
          </Stack>
        </Stack>
      </Card>

      {/* Payment method */}
      <Card
        title="Payment method"
        headerAction={<Badge variant="neutral">Default</Badge>}
        description="Used for all future invoices."
        footer={<Button variant="secondary" size="sm">Update card</Button>}
      >
        <Stack direction="row" align="center" gap="md">
          <Box background="subtle" borderRadius="md" padding="sm">
            <CreditCard className="h-5 w-5 text-brand" />
          </Box>
          <Stack gap="none" className="flex-1">
            <Text weight="medium">Visa ending ···· 4242</Text>
            <Text size="sm" tone="muted">Expires 08 / 2027</Text>
          </Stack>
          <Badge variant="success">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </Badge>
        </Stack>
      </Card>

      {/* Invoice history */}
      <Card title="Invoice history" description="Download PDFs for your records.">
        <Stack gap="none">
          <InvoiceRow date="Jun 1, 2026" amount="$232.00" status="pending" />
          <Separator />
          <InvoiceRow date="May 1, 2026" amount="$203.00" status="paid" />
          <Separator />
          <InvoiceRow date="Apr 1, 2026" amount="$203.00" status="paid" />
          <Separator />
          <InvoiceRow date="Mar 1, 2026" amount="$174.00" status="paid" />
        </Stack>
      </Card>
    </Stack>
  )

  const profileTab_content = (
    <>
      <Card
        footer={<Stack direction="row" gap="sm">
          <Button>Save changes</Button>
          <Button variant="secondary">Cancel</Button>
        </Stack>}
      >
        <Stack gap="lg">
          <Stack direction="row" align="center" gap="md">
            <Avatar>
              <AvatarImage src="" alt="AG" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <Stack gap="none" className="flex-1">
              <Text size="lg" weight="semibold">Anthony Gorman</Text>
              <Text size="sm">gormananthony2002@gmail.com</Text>
            </Stack>
            <Badge variant="brand">Pro</Badge>
          </Stack>
          <Grid cols={1} mdCols={2} gap="md">
            <Stack gap="sm">
              <Label htmlFor="cp-first-name">First name</Label>
              <Input id="cp-first-name" defaultValue="Anthony" />
            </Stack>
            <Stack gap="sm">
              <Label htmlFor="cp-last-name">Last name</Label>
              <Input id="cp-last-name" defaultValue="Gorman" />
            </Stack>
            <Stack gap="sm">
              <Label htmlFor="cp-email">Email</Label>
              <Input
                id="cp-email"
                type="email"
                defaultValue="gormananthony2002@gmail.com"
              />
            </Stack>
            <Stack gap="sm">
              <Label htmlFor="cp-timezone">Time zone</Label>
              <Select defaultValue="utc" options={TIMEZONES} />
            </Stack>
            <Stack gap="sm" className="md:col-span-2">
              <Label htmlFor="cp-company">Company</Label>
              <Input id="cp-company" placeholder="Your organization name" />
            </Stack>
          </Grid>
        </Stack>
      </Card>

      {/* Danger zone */}
      <Box padding="none" className="mt-6">
        <Card
          border="strong"
          title="Danger zone"
          headerAction={<Badge variant="error">Irreversible</Badge>}
          description="Deleting your account removes all data permanently."
          footer={<Button variant="destructive" size="sm">Delete account</Button>}
        />
      </Box>
    </>
  )

  const notificationsTab_content = (
    <Card
      title={<Stack direction="row" align="center" gap="sm"><Bell className="h-5 w-5 text-brand" />Notification preferences</Stack>}
      description="Control how and when Windforge reaches you."
      footer={<Button>Save preferences</Button>}
    >
      <Stack gap="lg">
        <NotifRow
          label="Usage alerts"
          description="Get notified when you reach 80% of any plan limit."
          defaultChecked
        />
        <Separator />
        <NotifRow
          label="Billing receipts"
          description="Email receipts and invoices each billing cycle."
          defaultChecked
        />
        <Separator />
        <NotifRow
          label="Product updates"
          description="Release notes and new-feature announcements."
        />
        <Separator />
        <NotifRow
          label="Security alerts"
          description="Logins from new devices and password changes."
          defaultChecked
        />
        <Separator />
        <NotifRow
          label="Team activity"
          description="When teammates join, leave, or change roles."
        />
      </Stack>
    </Card>
  )

  return (
    <PageLayout
      eyebrow="Design system"
      title="Composition"
      description="A realistic billing & account settings panel built component-first, using only Windforge components and intent props. Zero raw elements; className only on Box/Stack where truly needed."
    >
      <Section
        title="Billing & settings panel"
        subtitle="Tabs, stat cards, a usage bar, invoice history, profile form, and notification toggles, all from the closed component vocabulary."
      >
        <Example code={BILLING_JSX}>
          <Stack gap="lg">
            <Breadcrumb items={[
              { label: 'Dashboard', href: '#' },
              { label: 'Account settings' },
            ]} />

            <H2 size="2xl">Account settings</H2>

            <Tabs
              value={billingTab}
              onValueChange={setBillingTab}
              items={[
                { value: 'billing', label: 'Billing', content: billingTab_content },
                { value: 'profile', label: 'Profile', content: profileTab_content },
                { value: 'notifications', label: 'Notifications', content: notificationsTab_content },
              ]}
            />
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
