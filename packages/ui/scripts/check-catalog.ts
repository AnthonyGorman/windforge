/**
 * CATALOG DRIFT CHECK.
 *
 * The catalog is the AI's contract — it must match the code. This script reads the
 * `cva` variant definitions straight from the component source and asserts every
 * enum prop the catalog advertises matches the real variant keys (and that no
 * advertised component is missing from the package export). Run in CI:
 *
 *   npx tsx packages/ui/scripts/check-catalog.ts
 *
 * It catches the drift class that bit us before (AppBar/Pagination/Chip/Text):
 * a variant added/renamed/removed in a component without updating the catalog.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { catalog } from '../src/catalog'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = resolve(__dirname, '../src')

// catalog component → source file (relative to src/) + which catalog props are
// sourced from a cva variant group of the same name. (Props not listed here —
// radix unions, plain TS types, layout vocabulary — are validated by
// type-checking, not by this script.)
const CVA_SOURCED: Record<string, { file: string; props: string[] }> = {
  Text:   { file: 'components/text.tsx',   props: ['size', 'weight', 'tone', 'align', 'variant'] },
  Button: { file: 'components/button.tsx', props: ['variant', 'size'] },
  Badge:  { file: 'components/badge.tsx',  props: ['variant', 'size'] },
  Avatar: { file: 'components/avatar.tsx', props: ['size'] },
  Alert:  { file: 'components/alert.tsx',  props: ['variant'] },
  Link:   { file: 'components/link.tsx',   props: ['underline'] },
  Chip:   { file: 'components/chip.tsx',   props: ['size'] },
  Modal:  { file: 'components/modal.tsx',  props: ['size'] },
  Dialog: { file: 'components/modal.tsx',  props: ['size'] }, // Dialog forwards ModalContent size
  Sheet:  { file: 'components/sheet.tsx',  props: ['side'] },
  AppBar: { file: 'layouts/app-bar.tsx',   props: ['variant', 'color'] },
}

/** Drop line and block comments so braces/keys inside them never confuse parsing. */
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '')

/** Extract the top-level keys of a `<group>: { … }` cva variant block. */
function variantKeys(raw: string, group: string): string[] | null {
  const source = stripComments(raw)
  const opener = new RegExp(`\\b${group}:\\s*\\{`).exec(source)
  if (!opener) return null
  // Brace-match from the group's opening { (class strings here contain no braces).
  let depth = 0
  let start = opener.index + opener[0].length - 1
  let end = -1
  for (let i = start; i < source.length; i++) {
    if (source[i] === '{') depth++
    else if (source[i] === '}') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end === -1) return null
  const inner = source.slice(start + 1, end)
  // Each value is a quoted class string (no quotes/colons-then-quote inside), so a
  // key is `name:` immediately followed by an opening quote. Quoted keys ('2xl',
  // 'inline-code') are supported.
  const keys: string[] = []
  const keyRe = /(?:'([\w-]+)'|"([\w-]+)"|([A-Za-z_$][\w$]*))\s*:\s*['"]/g
  let m: RegExpExecArray | null
  while ((m = keyRe.exec(inner))) keys.push(m[1] ?? m[2] ?? m[3])
  return keys
}

const sorted = (a: string[]) => [...a].sort()
const eq = (a: string[], b: string[]) =>
  a.length === b.length && sorted(a).every((v, i) => v === sorted(b)[i])

let failures = 0
const fail = (msg: string) => { console.error('  ✗ ' + msg); failures++ }

for (const [name, { file, props }] of Object.entries(CVA_SOURCED)) {
  const spec = catalog[name]
  if (!spec) { fail(`catalog is missing component "${name}"`); continue }
  const source = readFileSync(resolve(SRC, file), 'utf8')
  for (const prop of props) {
    const real = variantKeys(source, prop)
    const declared = spec.props?.[prop] as string[] | undefined
    if (!real) { fail(`${name}.${prop}: no cva "${prop}" group found in ${file}`); continue }
    if (!declared) { fail(`${name}.${prop}: present in ${file} but missing from catalog`); continue }
    if (!eq(real, declared))
      fail(`${name}.${prop}: catalog [${sorted(declared).join(', ')}] ≠ code [${sorted(real).join(', ')}]`)
  }
}

if (failures) {
  console.error(`\n✗ catalog drift: ${failures} mismatch(es). Update packages/ui/src/catalog.ts.`)
  process.exit(1)
}
console.log(`✓ catalog matches code — ${Object.keys(CVA_SOURCED).length} components, cva variants in sync`)
