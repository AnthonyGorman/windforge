import {
  Card, Button, Badge, Separator, Stack, Box, Text,
} from '@windforge/ui'
import { ArrowUpRight, Check, TrendingUp } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function CardPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Card"
      description="A surface that groups related content and actions. Pass title, description, and footer slots as props, or drop content into children; the card is a styled container with padding and a quiet border."
    >
      <Section title="Anatomy" subtitle="Title, description, body, and footer are props — the card lays out the rhythm for you.">
        <Example
          code={`<Box className="w-80">
  <Card
    title="Deploy preview"
    description="Pushed 4 minutes ago to feat/onboarding."
    footer={<Stack direction="row" gap="sm">
      <Button>Visit preview</Button>
      <Button variant="secondary">View logs</Button>
    </Stack>}
  >
    <Text size="sm" tone="muted">
      Vercel finished building your branch. The preview is live and ready
      to share with reviewers.
    </Text>
  </Card>
</Box>`}
        >
          <Box className="w-80">
            <Card
              title="Deploy preview"
              description="Pushed 4 minutes ago to feat/onboarding."
              footer={<Stack direction="row" gap="sm">
                <Button>Visit preview</Button>
                <Button variant="secondary">View logs</Button>
              </Stack>}
            >
              <Text size="sm" tone="muted">
                Vercel finished building your branch. The preview is live and ready
                to share with reviewers.
              </Text>
            </Card>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Stat card" subtitle="A focused metric with a trend indicator — composed entirely in children for full layout control.">
        <Example
          code={`<Box className="w-72">
  <Card>
    <Stack gap="xs">
      <Text size="sm" tone="muted">Monthly recurring revenue</Text>
      <Text size="3xl" weight="bold">$48,120</Text>
      <Stack direction="row" align="center" gap="xs">
        <TrendingUp className="h-4 w-4 text-success" />
        <Text span size="sm" tone="muted"><b className="text-success">+12.4%</b> vs. last month</Text>
      </Stack>
    </Stack>
  </Card>
</Box>`}
        >
          <Box className="w-72">
            <Card>
              <Stack gap="xs">
                <Text size="sm" tone="muted">Monthly recurring revenue</Text>
                <Text size="3xl" weight="bold">$48,120</Text>
                <Stack direction="row" align="center" gap="xs">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <Text span size="sm" tone="muted"><b className="text-success">+12.4%</b> vs. last month</Text>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With badge and actions" subtitle="`headerAction` carries status opposite the title; `footer` carries the actions.">
        <Example
          code={`<Box className="w-80">
  <Card
    title="API key"
    headerAction={<Badge variant="success">Active</Badge>}
    description="Created Jun 2 · last used 3 hours ago"
    footer={<Stack direction="row" gap="sm" justify="end" className="w-full">
      <Button variant="tertiary" size="sm">Rotate</Button>
      <Button variant="destructive" size="sm">Revoke</Button>
    </Stack>}
  >
    <Box background="inset" className="block rounded-md px-3 py-2 font-mono text-sm text-primary">
      wf_live_••••••••••••4f9a
    </Box>
  </Card>
</Box>`}
        >
          <Box className="w-80">
            <Card
              title="API key"
              headerAction={<Badge variant="success">Active</Badge>}
              description="Created Jun 2 · last used 3 hours ago"
              footer={<Stack direction="row" gap="sm" justify="end" className="w-full">
                <Button variant="tertiary" size="sm">Rotate</Button>
                <Button variant="destructive" size="sm">Revoke</Button>
              </Stack>}
            >
              <Box background="inset" className="block rounded-md px-3 py-2 font-mono text-sm text-primary">
                wf_live_••••••••••••4f9a
              </Box>
            </Card>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Pricing card" subtitle="Cards scale up to marketing surfaces with a price, feature list, and a single action.">
        <Example
          code={`<Box className="w-80">
  <Card
    title="Pro"
    headerAction={<Badge variant="brand">Popular</Badge>}
    description="For teams shipping in production."
    footer={<Box className="w-full">
      <Button>Start free trial <ArrowUpRight className="h-4 w-4" /></Button>
    </Box>}
  >
    <Stack gap="md">
      <Stack direction="row" align="baseline" gap="xs">
        <Text size="4xl" weight="bold">$29</Text>
        <Text size="sm" tone="muted">/ seat / month</Text>
      </Stack>
      <Separator />
      <Stack gap="sm" className="text-sm text-secondary">
        <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Unlimited projects</Stack>
        <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Advanced analytics</Stack>
        <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Priority support</Stack>
      </Stack>
    </Stack>
  </Card>
</Box>`}
        >
          <Box className="w-80">
            <Card
              title="Pro"
              headerAction={<Badge variant="brand">Popular</Badge>}
              description="For teams shipping in production."
              footer={<Box className="w-full">
                <Button>Start free trial <ArrowUpRight className="h-4 w-4" /></Button>
              </Box>}
            >
              <Stack gap="md">
                <Stack direction="row" align="baseline" gap="xs">
                  <Text size="4xl" weight="bold">$29</Text>
                  <Text size="sm" tone="muted">/ seat / month</Text>
                </Stack>
                <Separator />
                <Stack gap="sm" className="text-sm text-secondary">
                  <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Unlimited projects</Stack>
                  <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Advanced analytics</Stack>
                  <Stack direction="row" align="center" gap="sm"><Check className="h-4 w-4 text-success" /> Priority support</Stack>
                </Stack>
              </Stack>
            </Card>
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
