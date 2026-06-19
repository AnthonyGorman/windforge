import * as React from 'react'
import { Search, Library, ExternalLink, Sparkles } from 'lucide-react'
import { Box, Stack, Text, Input, Button, Pagination, SVGIcon, commonIcons } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

type IconEntry = [name: string, Icon: React.ComponentType<{ className?: string }>]
const CURATED = (Object.entries(commonIcons) as IconEntry[]).sort(([a], [b]) => a.localeCompare(b))
const PAGE_SIZE = 24
const LUCIDE_URL = 'https://lucide.dev/icons/'

function IconTile({ name, Icon, copied, onCopy }: {
  name: string
  Icon: IconEntry[1]
  copied: boolean
  onCopy: (name: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(name)}
      title={`${name} — click to copy`}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-surface p-4 text-center transition-colors hover:border-strong hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--wf-color-border-focus)]"
    >
      <Icon className="h-6 w-6 text-primary" />
      <span className="w-full truncate text-xs text-secondary">{copied ? 'Copied!' : name}</span>
    </button>
  )
}

export function IconographyPage() {
  const [query, setQuery] = React.useState('')
  const [page, setPage] = React.useState(1)
  const [copied, setCopied] = React.useState<string | null>(null)

  React.useEffect(() => { setPage(1) }, [query])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? CURATED.filter(([name]) => name.toLowerCase().includes(q)) : CURATED
  }, [query])

  // With no search, tack on one extra page: the gateway out to the full library.
  const showGatewayPage = query.trim() === ''
  const iconPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const totalPages = iconPages + (showGatewayPage ? 1 : 0)
  const current = Math.min(page, totalPages)
  const onGateway = showGatewayPage && current === totalPages

  const start = (current - 1) * PAGE_SIZE
  const visible = filtered.slice(start, start + PAGE_SIZE)

  const copyName = (name: string) => {
    void navigator.clipboard?.writeText(name)
    setCopied(name)
    window.setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200)
  }

  return (
    <PageLayout
      eyebrow="Foundations"
      title="Iconography"
      description="lucide-react is the design system's supported icon library — a clean, consistent, open-source family of 1,500+ outline icons. Import any of them directly, size them with the size-icon utilities (size-icon-sm inline, size-icon default, size-icon-lg large), and they inherit the current text color. The gallery highlights commonly-used icons, and for anything bespoke you can wrap your own SVG in SVGIcon."
    >
      <Section
        title="Usage & sizing"
        subtitle="Each icon is a tree-shakeable named import. Size it with the single-class size-icon utilities — size-icon-sm (16px, inline), size-icon (24px, default), size-icon-lg (32px) — and it draws in currentColor, so text-color utilities tint it."
      >
        <Example
          code={`import { ArrowRight, Check } from 'lucide-react'

<Button>
  Continue <ArrowRight className="size-icon-sm" />
</Button>

<Check className="size-icon text-success" />`}
        >
          <Stack direction="row" align="center" gap="xl">
            {([['size-icon-sm', 'size-icon-sm'], ['size-icon', 'size-icon'], ['size-icon-lg', 'size-icon-lg']] as const).map(([label, cls]) => (
              <Stack key={label} align="center" gap="sm">
                <Sparkles className={`${cls} text-brand`} />
                <Text mono size="sm" tone="muted">{label}</Text>
              </Stack>
            ))}
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section
        title="Custom icons"
        subtitle="Need a glyph lucide doesn't have? Wrap your own SVG paths in SVGIcon — it inherits the same 24×24 grid, 2px currentColor strokes, and h-/w- sizing, so custom marks sit naturally beside lucide ones."
      >
        <Example
          code={`import { SVGIcon } from '@windforge/ui'

<SVGIcon label="Diamond" className="size-icon text-brand">
  <path d="M12 2 22 12 12 22 2 12Z" />
</SVGIcon>`}
        >
          <SVGIcon label="Diamond" className="size-icon text-brand">
            <path d="M12 2 22 12 12 22 2 12Z" />
          </SVGIcon>
        </Example>
      </Section>

      <PageDivider />

      <Section
        title="Commonly used"
        subtitle="A frequently-used selection from lucide. Search by name, then click any icon to copy its component name for import from lucide-react."
      >
        <Stack gap="md">
          <Stack direction="row" align="center" justify="between" wrap gap="md">
            <Stack direction="row" align="center" gap="sm" className="w-full max-w-xs">
              <Search className="h-4 w-4 shrink-0 text-tertiary" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${CURATED.length.toLocaleString()} common icons…`}
                aria-label="Search icons"
              />
            </Stack>
            <Text size="sm" tone="muted">
              {filtered.length.toLocaleString()} {filtered.length === 1 ? 'icon' : 'icons'}
            </Text>
          </Stack>

          {onGateway ? (
            <Box className="rounded-xl border border-dashed border-border py-16 text-center">
              <Stack gap="sm" align="center">
                <Library className="h-8 w-8 text-tertiary" />
                <Text size="lg" weight="semibold">Need something more specific?</Text>
                <Box className="max-w-md">
                  <Text tone="muted">
                    The selection above covers the common cases. Browse the full lucide
                    library — 1,500+ icons — and search every name on lucide.dev.
                  </Text>
                </Box>
                <Box className="pt-1">
                  <Button asChild>
                    <a href={LUCIDE_URL} target="_blank" rel="noreferrer">
                      <Library className="h-4 w-4" /> Browse all on lucide.dev
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </Box>
              </Stack>
            </Box>
          ) : visible.length === 0 ? (
            <Box className="rounded-xl border border-dashed border-border py-16 text-center">
              <Stack gap="sm" align="center">
                <Text tone="muted">No common icons match “{query}”.</Text>
                <Button asChild variant="secondary" size="sm">
                  <a href={`${LUCIDE_URL}?search=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer">
                    Search “{query}” on lucide.dev <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {visible.map(([name, Icon]) => (
                <IconTile key={name} name={name} Icon={Icon} copied={copied === name} onCopy={copyName} />
              ))}
            </Box>
          )}

          {totalPages > 1 && (
            <Stack direction="row" align="center" justify="between" wrap gap="md" className="pt-2">
              <Text size="sm" tone="muted">
                {onGateway
                  ? `${CURATED.length.toLocaleString()} common icons`
                  : `Showing ${start + 1}–${start + visible.length} of ${filtered.length.toLocaleString()}`}
              </Text>
              <Pagination page={current} count={totalPages} onPageChange={setPage} />
            </Stack>
          )}
        </Stack>
      </Section>
    </PageLayout>
  )
}
