import {
  useTheme, brandVars, Button, Badge, Card,
  Switch, Progress, Input, Label, Checkbox, Alert, Box, Stack, Text,
} from '@windforge/ui'
import { Check, Sparkles, Sun, Moon, MonitorSmartphone } from 'lucide-react'
import { PageLayout, Section } from '../components/PageLayout'
import { Example } from '../components/Example'
import { useStudioBrand } from '../theme/BrandContext'
import type { Ramp } from '@windforge/ui'

export function ThemingPage() {
  const { resolvedMode, mode, setMode } = useTheme()
  const { name, setBrand, accents, fontName, setFont, fonts } = useStudioBrand()
  const selectedLabel = accents.find((a) => a.name === name)?.label ?? name

  // brandVars derives the full brand set from one ramp; here we use it just to
  // paint each swatch in the active mode's primary. The actual app-wide swap is
  // wired in main.tsx via the ThemeProvider `tokens` prop, so picking a brand
  // re-skins everything (nav, logo, chrome and all) with no rebuild.
  const dotColor = (ramp: Ramp) => brandVars(ramp, resolvedMode)['--wf-color-brand-primary']

  // brand-primary-contrast is brand-derived (the opposite mode's primary tint),
  // reserved for brand-on-brand graphical use — not text (text on brand uses the
  // text-contrast token). The active button's face is brand-primary, so we paint
  // its swatch dot with this contrast tint to keep it visible against the face.
  const dotContrast = (ramp: Ramp) => brandVars(ramp, resolvedMode)['--wf-color-brand-primary-contrast']

  return (
    <PageLayout
      eyebrow="Configurable"
      title="Theming"
      description="The brand is a token, not a baked-in palette. The package ships one brand (indigo); a site overrides the brand CSS variables, statically for its own identity, or at runtime for a live swap. Studio owns the alternate palettes below and applies them through that same override."
    >
      <Section
        title="Brand color"
        subtitle="These palettes live in Studio, not the design system. Each is fed through brandVars(ramp, mode) into the ThemeProvider's token override. Pick one and the whole app re-skins, nothing rebuilds."
      >
        <Stack direction="row" wrap gap="sm">
          {accents.map((a) => {
            const active = name === a.name
            // Inactive: dot shows the accent's own primary. Active: the button
            // face is that primary, so the dot switches to the brand-contrast
            // tint to stay visible against it.
            const dot = active ? dotContrast(a.ramp) : dotColor(a.ramp)
            return (
              <Button
                key={a.name}
                variant={active ? 'primary' : 'secondary'}
                size="lg"
                onClick={() => setBrand(a.name)}
                aria-pressed={active}
              >
                <Box className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: dot }} />
                {a.label}
                {active && <Check className="h-4 w-4" />}
              </Button>
            )
          })}
        </Stack>

        <Stack direction="row" gap="sm" align="center" className="mt-4">
          <Text size="sm" tone="muted">Mode:</Text>
          {([['light', Sun], ['dark', Moon], ['system', MonitorSmartphone]] as const).map(([m, Icon]) => (
            <Button key={m} size="sm" variant={mode === m ? 'primary' : 'secondary'} onClick={() => setMode(m)}>
              <Icon className="h-4 w-4" /> {m}
            </Button>
          ))}
        </Stack>
      </Section>

      <Section
        title="Typeface"
        subtitle="Identity is more than color — the font is a token too. Picking one feeds themeVars({ brand, fontSans }, mode) into the same override; the whole app (this text included) re-renders in the new face, no rebuild."
      >
        <Stack direction="row" wrap gap="sm">
          {fonts.map((f) => (
            <Button
              key={f.name}
              variant={fontName === f.name ? 'primary' : 'secondary'}
              onClick={() => setFont(f.name)}
              aria-pressed={fontName === f.name}
            >
              <span style={{ fontFamily: f.stack }}>{f.label}</span>
              {fontName === f.name && <Check className="h-4 w-4" />}
            </Button>
          ))}
        </Stack>
      </Section>

      <Section
        title="Live preview"
        subtitle="The override is applied app-wide as inline --wf-* custom properties on the provider; these components (and the nav, logo, and this page's accents) all re-skin together."
      >
        <Box className="grid gap-4 md:grid-cols-2">
          <Card
            footer={<>
              <Button>Upgrade now</Button>
              <Button variant="tertiary">Compare plans</Button>
            </>}
          >
            <Stack gap="md">
              <Stack gap="xs">
                <Box className="mb-1 w-fit">
                  <Badge variant="subtle"><Sparkles className="h-3 w-3" /> Pro plan</Badge>
                </Box>
                <Text size="lg" weight="semibold">Upgrade your workspace</Text>
                <Text size="sm">Unlimited projects, priority support, and audit logs.</Text>
              </Stack>
              <Stack gap="sm">
                <Label htmlFor="seat-count">Seats</Label>
                <Input id="seat-count" placeholder="e.g. 12" defaultValue="12" />
              </Stack>
              <Progress value={68} />
              <Stack direction="row" gap="sm" align="center">
                <Checkbox id="annual" defaultChecked />
                <Label htmlFor="annual">Bill annually (save 20%)</Label>
              </Stack>
            </Stack>
          </Card>

          <Stack gap="md">
            <Alert
              variant="info"
              icon={<Sparkles />}
              title={`Brand applied: ${selectedLabel}`}
              description="Status colors (info/success/warning/error) stay fixed; only the brand identity changes."
            />
            <Card>
              <Stack gap="md">
                <Stack direction="row" justify="between" align="center">
                  <Label htmlFor="notify">Email notifications</Label>
                  <Switch id="notify" defaultChecked />
                </Stack>
                <Stack direction="row" wrap gap="sm">
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">Secondary</Button>
                  <Button size="sm" variant="tertiary">Tertiary</Button>
                  <Badge>Brand</Badge>
                  <Badge variant="outline">Outline</Badge>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Section>

      <Section
        title="How a consumer applies it"
        subtitle="Two levers, one mechanism (override the --wf-* brand vars): pick by binding time."
      >
        <Example
          code={`/* A. A site's FIXED identity: a static CSS override, no JS. */
/* brand.css, loaded after @windforge/tokens/tokens.css */
:root { --wf-color-brand-primary: #15803d; --wf-font-sans: "Geist", sans-serif; }
.dark { --wf-color-brand-primary: #4ade80; /* … */ }

/* …or map your own tokens onto ours: */
:root { --wf-color-brand-primary: var(--acme-brand-600); }

// B. RUNTIME swap, the library capability (this page uses it). themeVars swaps
//    brand + font + radius + any --wf-* token in one call, applied at :root so it
//    reaches portaled overlays too:
import { ThemeProvider, themeVars } from '@windforge/ui'

<ThemeProvider tokens={(mode) => themeVars(
  { brand: myRamp, fontSans: '"Geist", sans-serif', radius: { lg: '1rem' } },
  mode,
)}>
  <App />
</ThemeProvider>`}
        />
      </Section>
    </PageLayout>
  )
}
