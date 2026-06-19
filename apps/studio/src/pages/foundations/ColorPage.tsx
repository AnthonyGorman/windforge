import React, { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import {
  lightColors, darkColors, Box, Stack, Text, Button,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
const cssToken = (g: string, k: string) => `--wf-color-${kebab(g)}-${kebab(k)}`

const PURPOSE: [string, string][] = [
  ['Brand', 'Identity and emphasis: primary actions, active states. This is the ramp a theme swap moves.'],
  ['Background', 'Surfaces and layering: page, cards, subtle fills, insets, and overlays.'],
  ['Text (fg)', 'Content hierarchy: primary, muted, subtle, disabled, link, and inverse.'],
  ['Border', 'Structure: dividers, outlines, strong edges, and the focus border.'],
  ['Status', 'Meaning: info, success, warning, and error. Fixed across brands.'],
]

const L = lightColors as unknown as Record<string, Record<string, string>>
const D = darkColors as unknown as Record<string, Record<string, string>>

type Row = { group: string; key: string; light: string; dark: string }
const startsWith = (p: string) => (k: string) => k.toLowerCase().startsWith(p)
function group(g: string, filter?: (k: string) => boolean): Row[] {
  return Object.keys(L[g]).filter(filter ?? (() => true)).map((k) => ({ group: g, key: k, light: L[g][k], dark: D[g][k] }))
}

const GROUPS: { label: string; rows: Row[] }[] = [
  { label: 'Brand', rows: group('brand') },
  { label: 'Background', rows: group('background') },
  { label: 'Text', rows: group('text') },
  { label: 'Border', rows: group('border') },
  { label: 'Info', rows: group('status', startsWith('info')) },
  { label: 'Success', rows: group('status', startsWith('success')) },
  { label: 'Warning', rows: group('status', startsWith('warning')) },
  { label: 'Error', rows: group('status', startsWith('error')) },
  { label: 'Common', rows: group('common') },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [text])
  return (
    <Box className="ml-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
      <Button variant="tertiary" size="icon" onClick={copy} aria-label="Copy token">
        {copied ? <Check className="text-success" /> : <Copy />}
      </Button>
    </Box>
  )
}

function Swatch({ hex }: { hex: string }) {
  return (
    <Stack direction="row" align="center" className="gap-2">
      <Box
        className="h-6 w-6 shrink-0 rounded-md border border-border"
        style={{
          backgroundImage:
            'linear-gradient(45deg,#0002 25%,transparent 25%),linear-gradient(-45deg,#0002 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0002 75%),linear-gradient(-45deg,transparent 75%,#0002 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0,0 4px,4px -4px,-4px 0',
        }}
      >
        <Box className="h-full w-full rounded-md" style={{ backgroundColor: hex }} />
      </Box>
      <Text mono size="sm" tone="muted">{hex}</Text>
    </Stack>
  )
}

export function ColorPage() {
  return (
    <PageLayout
      eyebrow="Foundations"
      title="Color"
      description="Color is semantic and token-driven; no hardcoded hex values. Each color is a single token, resolved automatically for light and dark, generated from a small set of primitive ramps. Components reference them as Tailwind utilities such as bg-brand, text-secondary, and border-border."
    >
      <Section title="What we use color for" subtitle="Every token belongs to a group with a single responsibility.">
        <Stack gap="sm">
          {PURPOSE.map(([label, desc]) => (
            <Box key={label} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <Box className="w-32 shrink-0 text-sm font-semibold text-primary">{label}</Box>
              <Text size="sm" tone="muted">{desc}</Text>
            </Box>
          ))}
        </Stack>
      </Section>

      <PageDivider />

      <Section title="Token reference" subtitle="Every semantic token with its resolved hex in each mode. Two extra hex digits mean alpha (transparency).">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Light</TableHead>
              <TableHead>Dark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {GROUPS.map((g) => (
              <React.Fragment key={g.label}>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Box className="pt-2 text-sm font-semibold uppercase tracking-wider text-brand">{g.label}</Box>
                  </TableCell>
                </TableRow>
                {g.rows.map((r) => {
                  const token = cssToken(r.group, r.key)
                  return (
                    <TableRow key={`${r.group}.${r.key}`}>
                      <TableCell>
                        <Stack direction="row" align="center" gap="none" className="group">
                          <Text mono size="sm">{token}</Text>
                          <CopyButton text={token} />
                        </Stack>
                      </TableCell>
                      <TableCell><Swatch hex={r.light} /></TableCell>
                      <TableCell><Swatch hex={r.dark} /></TableCell>
                    </TableRow>
                  )
                })}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Section>
    </PageLayout>
  )
}
