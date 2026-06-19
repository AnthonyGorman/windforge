import { lightColors, darkColors, Button, Input, Box, Stack, Grid, Text, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@windforge/ui'
import { Check, X, Keyboard } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'

// ── WCAG contrast (ignores alpha; pairs below are solid) ────────────────────────
function lum(hex: string) {
  const h = hex.replace('#', '').slice(0, 6)
  const v = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
}
function ratio(a: string, b: string) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

const L = lightColors as unknown as Record<string, Record<string, string>>
const D = darkColors as unknown as Record<string, Record<string, string>>

const PAIRS: { label: string; fg: string; bg: string }[] = [
  { label: 'Body text on page', fg: L.text.primary, bg: L.background.default },
  { label: 'Muted text on page', fg: L.text.secondary, bg: L.background.default },
  { label: 'Link on page', fg: L.text.link, bg: L.background.default },
  { label: 'On primary button', fg: L.text.contrast, bg: L.brand.primary },
  { label: 'Inverse text on inverse', fg: L.text.inverse, bg: L.background.inverse },
  { label: 'Dark: body on page', fg: D.text.primary, bg: D.background.default },
  { label: 'Dark: on primary button', fg: D.text.contrast, bg: D.brand.primary },
]

function Badge({ ok, large }: { ok: boolean; large?: boolean }) {
  return (
    <Box className={'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-medium ' + (ok ? 'bg-success-subtle text-success-fg' : 'bg-error-subtle text-error-fg')}>
      {ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}{large ? 'AA Large' : 'AA'}
    </Box>
  )
}

export function AccessibilityPage() {
  return (
    <PageLayout
      eyebrow="Foundations"
      title="Accessibility"
      description="Accessibility is built into the tokens. Text and surface pairings are chosen to clear WCAG AA, focus is always visible, and color is never the sole signal."
    >
      <Section title="Verified contrast" subtitle="Computed ratios for the key semantic pairings. AA requires 4.5:1 for body text and 3:1 for large text and UI.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pairing</TableHead>
              <TableHead>Sample</TableHead>
              <TableHead>Ratio</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAIRS.map((p) => {
              const r = ratio(p.fg, p.bg)
              return (
                <TableRow key={p.label}>
                  <TableCell><Text size="sm">{p.label}</Text></TableCell>
                  <TableCell>
                    <Box className="inline-block rounded px-2.5 py-1 text-sm font-medium" style={{ color: p.fg, backgroundColor: p.bg }}>Sample</Box>
                  </TableCell>
                  <TableCell><Text mono size="sm" tone="muted">{r.toFixed(2)}:1</Text></TableCell>
                  <TableCell>{r >= 4.5 ? <Badge ok /> : <Badge ok={r >= 3} large />}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Section>

      <PageDivider />

      <Section title="Always-visible focus" subtitle="Every interactive component renders a 2px focus ring from border.focus. Tab through these to confirm.">
        <Stack direction="row" wrap align="center" className="gap-3 rounded-xl border border-border bg-surface p-6">
          <Button>Focusable</Button>
          <Button variant="secondary">Focusable</Button>
          <Box className="w-48"><Input placeholder="Focus me" /></Box>
        </Stack>
      </Section>

      <PageDivider />

      <Section title="Keyboard and semantics" subtitle="Radix provides every overlay with correct roles, focus trapping, and key handling.">
        <Box className="grid gap-3 sm:grid-cols-2">
          {[
            ['Tab / Shift+Tab', 'Move between controls; focus is trapped inside open dialogs'],
            ['Esc', 'Closes dialogs, popovers, dropdowns, and sheets'],
            ['Space / Enter', 'Toggles switches & checkboxes, activates buttons'],
            ['Arrow keys', 'Navigate menus, tabs, radio groups, and sliders'],
          ].map(([k, d]) => (
            <Stack key={k} direction="row" align="start" className="gap-3 rounded-xl border border-border bg-surface p-4">
              <Keyboard className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <Box>
                <Text mono size="sm" weight="semibold">{k}</Text>
                <Box className="mt-0.5"><Text size="sm" tone="muted">{d}</Text></Box>
              </Box>
            </Stack>
          ))}
        </Box>
      </Section>
    </PageLayout>
  )
}
