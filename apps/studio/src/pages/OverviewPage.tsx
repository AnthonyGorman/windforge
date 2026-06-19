import { useNavigate } from 'react-router-dom'
import {
  Button, Badge, Card,
  ForgeIcon, Separator, Box, Stack, Grid, Text, H1, H2,
} from '@windforge/ui'
import {
  ArrowRight, Boxes, Bot, Ruler, SwatchBook, ShieldCheck, Sparkles, Zap, Code2,
} from 'lucide-react'

const PILLARS = [
  {
    icon: Ruler,
    title: 'Strict',
    body: 'A component-first, style-last paradigm keeps agents in check, offering a consistent visual experience, with flexibility in all the right places.',
  },
  {
    icon: Boxes,
    title: 'Composable',
    body: 'A small set of primitives (Box, Stack, Grid, and the components) composes into any screen. Spacing, color, and radius are tokens, so every composition stays on-grid.',
  },
  {
    icon: SwatchBook,
    title: 'Configurable',
    body: 'The system derives from a token-based source of truth. Change a token, regenerate, and every component updates. Re-skin an entire product without editing a single component.',
  },
  {
    icon: Bot,
    title: 'AI-native',
    body: 'The code says exactly what it does: intent-named props, no hidden styling. Agents "just know" how to build, reading the shipped registry for guaranteed on-system output.',
  },
]

const STORIES = [
  {
    tag: 'Founder',
    quote: 'I described a billing dashboard. The agent assembled it from Windforge components with correct spacing, dark mode, and accessibility, and I shipped it the same afternoon.',
    name: 'The 1-day SaaS',
  },
  {
    tag: 'Agency',
    quote: 'Same codebase, eleven client brands. Each brand is a small set of tokens, so onboarding a new client is a config change, not a restyle of a hundred components.',
    name: 'The brand factory',
  },
  {
    tag: 'Designer',
    quote: 'Every screen comes out polished by default: balanced spacing, a real type scale, considered contrast, and motion that feels intentional. I spend my time refining the last 5%, not fighting for the first 95%.',
    name: 'The design enthusiast',
  },
]

export function OverviewPage() {
  const navigate = useNavigate()

  return (
    <Box className="mx-auto max-w-5xl pb-24">
      {/* Hero */}
      <Box className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center md:px-12 md:py-20">
          <Box
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden opacity-60 dark:block"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 0%, var(--wf-color-brand-primary-muted), transparent 70%)',
            }}
          />
          <Box className="relative">
            <Box className="mb-6 flex justify-center">
              <Badge variant="subtle">
                <Sparkles className="h-3 w-3" /> Token-driven · indigo by default
              </Badge>
            </Box>
            <Box className="mb-6 flex justify-center">
              <ForgeIcon className="h-16 w-16 drop-shadow-[0_8px_24px_var(--wf-color-brand-primary-muted)]" />
            </Box>
            <Box className="mx-auto max-w-3xl text-balance">
              <H1 size="5xl">
                The design system for an{' '}
                <Text span size="5xl" tone="gradient">AI SaaS factory</Text>
              </H1>
            </Box>
            <Box className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed">
              <Text tone="muted">
                Composable, configurable, and strict by design. Token-driven on Radix and Tailwind, so an
                agent generates guaranteed on-system products.
              </Text>
            </Box>
            <Stack direction="row" wrap gap="sm" align="center" justify="center" className="mt-8">
              <Button size="lg" onClick={() => navigate('/components/button')}>
                Browse components <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/theming')}>
                <SwatchBook className="h-4 w-4" /> Try live theming
              </Button>
            </Stack>
            <Stack direction="row" wrap align="center" justify="center" gap="none" className="mt-10 gap-x-6 gap-y-2 text-sm text-tertiary">
              <Box className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4" /> No CSS-in-JS runtime</Box>
              <Box className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> WCAG-checked tokens</Box>
              <Box className="inline-flex items-center gap-1.5"><Code2 className="h-4 w-4" /> Own-the-source registry</Box>
            </Stack>
          </Box>
      </Box>

      {/* Pillars */}
      <Box className="mt-16">
        <H2 size="2xl" align="center">
          Four ideas, one architecture
        </H2>
        <Box className="mx-auto mt-2 max-w-xl text-center text-sm">
          <Text tone="muted">Strict · composable · configurable · AI-native.</Text>
        </Box>
        <Box className="mt-8 grid gap-4 sm:grid-cols-2">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <Card key={title}>
              <Stack gap="xs">
                <Box className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                  <Icon className="h-5 w-5" />
                </Box>
                <Text size="lg" weight="semibold">{title}</Text>
                <Text>{body}</Text>
              </Stack>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Stories */}
      <Box className="mt-16">
        <H2 size="2xl" align="center">What it unlocks</H2>
        <Grid cols={1} mdCols={3} gap="md" className="mt-8">
            {STORIES.map((s) => (
              <Stack
                key={s.name}
                justify="between"
                gap="md"
                padding="lg"
                background="surface"
                border="default"
                borderRadius="2xl"
                boxShadow="sm"
                className="h-full"
              >
                <Stack gap="sm" align="start">
                  <Badge variant="neutral">{s.tag}</Badge>
                  <Text>"{s.quote}"</Text>
                </Stack>
                <Stack gap="sm">
                  <Separator />
                  <Text weight="semibold">{s.name}</Text>
                </Stack>
              </Stack>
            ))}
          </Grid>
      </Box>

      {/* Pipeline */}
      <Box className="mt-16 rounded-2xl border border-border bg-surface-subtle p-6 md:p-10">
        <H2 size="xl">The token pipeline</H2>
        <Box className="mt-1.5 max-w-2xl text-sm">
          <Text tone="muted">
            A typed source of truth compiles to CSS variables, a Tailwind map, and TypeScript constants.
            Edit a token, regenerate, and every component re-skins. The live theme switcher uses this
            same mechanism at runtime.
          </Text>
        </Box>
        <Stack direction="row" wrap gap="sm" align="center" className="mt-6 font-mono text-sm">
          {['primitives.ts', 'semantic.ts', 'compiler', 'tokens.css', 'components'].map((step, i, arr) => (
            <Box key={step} className="flex items-center gap-2">
              <Box className="rounded-md border border-border bg-surface px-3 py-1.5 text-primary">{step}</Box>
              {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-tertiary" />}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
