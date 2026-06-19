import { Alert, Stack, Box, Button } from '@windforge/ui'
import { Info, CheckCircle2, AlertTriangle, XCircle, Bell } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function AlertPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Alert"
      description="An inline message that calls out information without interrupting the flow. The leading lucide icon and the variant color signal tone at a glance."
    >
      <Section title="Anatomy" subtitle="An icon, a title, and a description — passed as props, no sub-components to assemble.">
        <Example
          code={`<Alert
  variant="info"
  icon={<Info />}
  title="Heads up"
  description="Your trial ends in 5 days. Add a payment method to keep your projects running."
/>`}
        >
          <Box className="w-full">
            <Alert
              variant="info"
              icon={<Info />}
              title="Heads up"
              description="Your trial ends in 5 days. Add a payment method to keep your projects running."
            />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Variants" subtitle="Five tones span the range from a quiet notice to a hard failure.">
        <Example
          code={`<Alert variant="neutral" icon={<Bell />} title="Notice"
  description="Scheduled maintenance this Sunday from 02:00–04:00 UTC." />

<Alert variant="info" icon={<Info />} title="New version available"
  description="Windforge 2.4 ships refreshed tokens and a faster build." />

<Alert variant="success" icon={<CheckCircle2 />} title="Deployment succeeded"
  description="api-gateway is live on production. All health checks passed." />

<Alert variant="warning" icon={<AlertTriangle />} title="Approaching your limit"
  description="You've used 92% of your monthly request quota." />

<Alert variant="error" icon={<XCircle />} title="Build failed"
  description="TypeScript reported 3 errors in src/server. See the logs for details." />`}
        >
          <Stack gap="sm" className="w-full">
            <Alert variant="neutral" icon={<Bell />} title="Notice"
              description="Scheduled maintenance this Sunday from 02:00–04:00 UTC." />
            <Alert variant="info" icon={<Info />} title="New version available"
              description="Windforge 2.4 ships refreshed tokens and a faster build." />
            <Alert variant="success" icon={<CheckCircle2 />} title="Deployment succeeded"
              description="api-gateway is live on production. All health checks passed." />
            <Alert variant="warning" icon={<AlertTriangle />} title="Approaching your limit"
              description="You've used 92% of your monthly request quota." />
            <Alert variant="error" icon={<XCircle />} title="Build failed"
              description="TypeScript reported 3 errors in src/server. See the logs for details." />
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Title only" subtitle="Omit the description for a single-line callout.">
        <Example
          code={`<Alert variant="success" icon={<CheckCircle2 />} title="Saved. All changes are up to date." />`}
        >
          <Box className="w-full">
            <Alert variant="success" icon={<CheckCircle2 />} title="Saved. All changes are up to date." />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="With actions" subtitle="Pass `actions` for trailing buttons; they sit below the text.">
        <Example
          code={`<Alert
  variant="warning"
  icon={<AlertTriangle />}
  title="Approaching your limit"
  description="You've used 92% of your monthly request quota."
  actions={<>
    <Button variant="secondary" size="sm">Dismiss</Button>
    <Button size="sm">Upgrade plan</Button>
  </>}
/>`}
        >
          <Box className="w-full">
            <Alert
              variant="warning"
              icon={<AlertTriangle />}
              title="Approaching your limit"
              description="You've used 92% of your monthly request quota."
              actions={<>
                <Button variant="secondary" size="sm">Dismiss</Button>
                <Button size="sm">Upgrade plan</Button>
              </>}
            />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
