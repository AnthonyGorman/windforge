import * as React from 'react'
import { Highlight, type PrismTheme } from 'prism-react-renderer'
import { Check, Copy } from 'lucide-react'
import { cn } from '../lib/utils'
import { focusRingInset } from '../lib/recipes'

/**
 * CodeBlock — the on-system, syntax-highlighted code surface. One source of truth
 * for every snippet in the system (docs, examples, anywhere). Highlighting runs
 * locally via prism-react-renderer — no network, no API. The token theme below is
 * built from `var(--wf-*)` references, so colors resolve live: the code re-skins
 * with light/dark and with a brand swap automatically, no JS reactivity needed.
 *
 * Takes no className by design — its surface is fixed so every snippet in a product
 * renders identically.
 *
 *   <CodeBlock code={src} language="tsx" filename="button.tsx" showLineNumbers />
 */
export interface CodeBlockProps {
  code: string
  /** Prism language id. Default 'tsx'. */
  language?: string
  /** Optional header filename; shown left of the language label. */
  filename?: string
  /** Render a left gutter with 1-based line numbers. */
  showLineNumbers?: boolean
  /** 1-based line numbers to emphasize. */
  highlightLines?: number[]
  /** Soft-wrap long lines instead of scrolling horizontally. */
  wrap?: boolean
  /** Max height before vertical scroll, e.g. '24rem'. */
  maxHeight?: string
  /** Show the copy button (default true). */
  copyable?: boolean
}

// Token-driven Prism theme. Every color is a live CSS variable, so the panel
// follows the active mode and brand with zero JS — keywords ride the brand, the
// status ramp carries strings/numbers/props, neutrals carry text/comments.
const prismTheme: PrismTheme = {
  plain: { color: 'var(--wf-color-text-primary)', backgroundColor: 'transparent' },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: 'var(--wf-color-text-tertiary)', fontStyle: 'italic' } },
    { types: ['punctuation'], style: { color: 'var(--wf-color-text-secondary)' } },
    { types: ['tag', 'keyword', 'selector', 'operator', 'builtin'], style: { color: 'var(--wf-color-brand-primary)' } },
    { types: ['function', 'class-name', 'function-variable'], style: { color: 'var(--wf-color-status-info-default)' } },
    { types: ['attr-name', 'property', 'variable', 'entity'], style: { color: 'var(--wf-color-status-error-default)' } },
    { types: ['string', 'char', 'attr-value', 'inserted', 'regex'], style: { color: 'var(--wf-color-status-success-default)' } },
    { types: ['number', 'boolean', 'constant', 'symbol'], style: { color: 'var(--wf-color-status-warning-default)' } },
  ],
}

export function CodeBlock({
  code, language = 'tsx', filename, showLineNumbers, highlightLines, wrap, maxHeight, copyable = true,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const text = code.replace(/\n+$/, '')
  const highlightSet = React.useMemo(() => new Set(highlightLines ?? []), [highlightLines])

  const copy = () => {
    void navigator.clipboard?.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  const copyButton = (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-md text-secondary opacity-70 transition-opacity',
        'hover:bg-surface-subtle hover:opacity-100 [&_svg]:size-4',
        focusRingInset,
      )}
    >
      {copied ? <Check className="text-success" /> : <Copy />}
    </button>
  )

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-inset text-sm">
      {filename != null && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2">
          <span className="truncate font-mono text-sm text-secondary">{filename}</span>
          <div className="flex items-center gap-2">
            <span className="select-none text-sm uppercase tracking-wide text-tertiary">{language}</span>
            {copyable && copyButton}
          </div>
        </div>
      )}

      {filename == null && copyable && <div className="absolute right-2 top-2 z-10">{copyButton}</div>}

      <Highlight code={text} language={language} theme={prismTheme}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn('m-0 overflow-auto py-3 font-mono text-sm leading-relaxed', filename == null && copyable && 'pr-12')}
            style={{ ...style, background: 'transparent', maxHeight }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              const isHot = highlightSet.has(i + 1)
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={cn(lineProps.className, 'flex px-4', wrap && 'whitespace-pre-wrap', isHot && 'bg-brand-subtle')}
                >
                  {showLineNumbers && (
                    <span className="mr-4 inline-block w-6 shrink-0 select-none text-right text-tertiary">{i + 1}</span>
                  )}
                  <span className={cn('flex-1', wrap && 'break-words')}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
