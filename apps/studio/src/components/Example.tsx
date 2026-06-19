import React from 'react'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import * as Icons from 'lucide-react'
import * as WF from '@windforge/ui'
import { Box, Stack, CodeBlock } from '@windforge/ui'

export function dedent(src: string): string {
  const lines = src.replace(/^\n/, '').replace(/\s+$/, '').split('\n')
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length)
  const min = indents.length ? Math.min(...indents) : 0
  return lines.map((l) => l.slice(min)).join('\n')
}

// Live-preview scope: every Windforge export + every lucide icon + the hooks an
// example might use. WF is spread last so the design-system components win any
// name collision with a lucide icon (e.g. Box, Link, Table).
const scope = { ...Icons, ...WF, React, useState: React.useState, useEffect: React.useEffect }

interface ExampleProps {
  code: string
  /**
   * Legacy/explicit preview node. Prefer `live` (the preview is rendered from
   * `code`, so the snippet and what's shown can never drift). Use `children` only
   * for demos that aren't a single evaluable expression.
   */
  children?: React.ReactNode
  /** Render the preview FROM `code` via react-live — single source of truth. */
  live?: boolean
  center?: boolean
  language?: string
}

/** Strip import lines (not evaluable) so a documented snippet can still show them. */
const toEvalCode = (code: string) => {
  const body = code.replace(/^\s*import[^\n]*\n?/gm, '').trim()
  // Multi-statement snippets opt into react-live's noInline via a `render(...)` call.
  const noInline = /\brender\s*\(/.test(body)
  // A single expression with sibling roots still evaluates if wrapped in a fragment.
  return { evalCode: noInline ? body : `<>\n${body}\n</>`, noInline }
}

export function Example({ code, children, live = false, center = false, language = 'tsx' }: ExampleProps) {
  const text = dedent(code)
  const { evalCode, noInline } = toEvalCode(text)
  const hasPreview = live || children !== undefined

  const previewRow = (node: React.ReactNode) => (
    <Stack
      direction="row"
      wrap
      align="center"
      justify={center ? 'center' : 'start'}
      background="surface"
      className="gap-3 border-b border-border p-6"
    >
      {node}
    </Stack>
  )

  // CodeBlock owns the highlighting (one source of truth across the studio); inside
  // the Example frame we strip its own border/rounding so the outer Box is the frame.
  const codePanel = (
    <Box className="[&>div]:rounded-none [&>div]:border-0">
      <CodeBlock code={text} language={language} />
    </Box>
  )

  return (
    <Box border="default" borderRadius="xl" className="overflow-hidden">
      {live ? (
        <LiveProvider code={evalCode} scope={scope} noInline={noInline}>
          {previewRow(<LivePreview />)}
          <LiveError className="m-0 border-b border-border bg-error-subtle p-3 font-mono text-sm text-error" />
          {codePanel}
        </LiveProvider>
      ) : (
        <>
          {hasPreview && previewRow(children)}
          {codePanel}
        </>
      )}
    </Box>
  )
}
