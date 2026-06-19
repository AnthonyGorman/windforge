/**
 * Unit tests for the llms.txt generator. Run:
 *
 *   npx tsx --test packages/ui/scripts/generate-llms.test.ts
 *
 * These assert the spec stays complete and code-derived: every catalog component
 * and every enum value it advertises must appear in the generated document, so an
 * agent reading llms.txt sees exactly the on-system surface.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildLlmsTxt } from './generate-llms'
import { catalog } from '../src/catalog'

const doc = buildLlmsTxt()

test('has the title, summary, and the required sections', () => {
  assert.match(doc, /^# Windforge \(@windforge\/ui\)/)
  assert.match(doc, /^> A composable, configurable, strict/m)
  for (const heading of ['## Rules', '## Setup', '## Components']) {
    assert.ok(doc.includes(heading), `missing section: ${heading}`)
  }
})

test('lists every component in the catalog', () => {
  for (const name of Object.keys(catalog)) {
    assert.ok(doc.includes(`### ${name}`), `component not documented: ${name}`)
  }
})

test('renders every enum value of every prop (no invented or dropped values)', () => {
  for (const [name, spec] of Object.entries(catalog)) {
    for (const [prop, values] of Object.entries(spec.props ?? {})) {
      for (const value of values) {
        assert.ok(
          doc.includes(`\`${value}\``),
          `value "${value}" of ${name}.${prop} missing from llms.txt`,
        )
      }
    }
  }
})

test('documents the strict className / token rules an agent must follow', () => {
  assert.match(doc, /`className` and `style` are rejected/)
  assert.match(doc, /Box` \/ `Stack` \/ `Grid`/)
  assert.match(doc, /--wf-\*/)
})

test('setup block uses the published preset and token css entrypoints', () => {
  assert.ok(doc.includes("require('@windforge/ui/tailwind')"))
  assert.ok(doc.includes("import '@windforge/tokens/tokens.css'"))
})

test('is deterministic — same input yields identical output', () => {
  assert.equal(buildLlmsTxt(), doc)
})
