import { Label, Switch, Stack } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SwitchPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Switch"
      description="An instant on/off toggle for settings that take effect immediately. Use it over a checkbox when there's no submit step between the user and the change."
    >
      <Section title="Usage" subtitle="Pair a Switch with a Label and connect them with id / htmlFor.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm">
  <Switch id="wifi" />
  <Label htmlFor="wifi">Wi-Fi</Label>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm">
            <Switch id="wifi" />
            <Label htmlFor="wifi">Wi-Fi</Label>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Disabled" subtitle="Locked toggles keep their state but can't be flipped.">
        <Example
          code={`<Stack direction="row" align="center" gap="sm">
  <Switch id="enforced" defaultChecked disabled />
  <Label htmlFor="enforced">Two-factor auth (enforced)</Label>
</Stack>`}
        >
          <Stack direction="row" align="center" gap="sm">
            <Switch id="enforced" defaultChecked disabled />
            <Label htmlFor="enforced">Two-factor auth (enforced)</Label>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Settings list" subtitle="A column of labeled rows forms a tidy preferences panel.">
        <Example
          code={`<Stack gap="none" className="w-full max-w-sm divide-y divide-border">
  <Stack direction="row" align="center" justify="between" className="py-3">
    <Label htmlFor="s1">Email digest</Label>
    <Switch id="s1" defaultChecked />
  </Stack>
  <Stack direction="row" align="center" justify="between" className="py-3">
    <Label htmlFor="s2">Desktop notifications</Label>
    <Switch id="s2" />
  </Stack>
  <Stack direction="row" align="center" justify="between" className="py-3">
    <Label htmlFor="s3">Auto-archive read items</Label>
    <Switch id="s3" defaultChecked />
  </Stack>
</Stack>`}
        >
          <Stack gap="none" className="w-full max-w-sm divide-y divide-border">
            <Stack direction="row" align="center" justify="between" className="py-3">
              <Label htmlFor="s1">Email digest</Label>
              <Switch id="s1" defaultChecked />
            </Stack>
            <Stack direction="row" align="center" justify="between" className="py-3">
              <Label htmlFor="s2">Desktop notifications</Label>
              <Switch id="s2" />
            </Stack>
            <Stack direction="row" align="center" justify="between" className="py-3">
              <Label htmlFor="s3">Auto-archive read items</Label>
              <Switch id="s3" defaultChecked />
            </Stack>
          </Stack>
        </Example>
      </Section>
    </PageLayout>
  )
}
