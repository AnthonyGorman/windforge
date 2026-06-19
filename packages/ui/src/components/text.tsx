import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * Text — the typography primitive (our `Typography`). Size, weight, tone and
 * alignment are a closed token vocabulary; nothing renders off-scale. Renders a
 * `<p>` by default; use `asChild` for the right semantic element:
 *
 *   <Text size="3xl" weight="bold" asChild><h1>Title</h1></Text>
 *   <Text tone="muted">Body copy</Text>
 *   <Text span weight="medium">inline label</Text>   // inline <span>, not a block <p>
 *   <Text variant="inline-code">defaultOpen</Text>   // inline <code> within prose
 */
const text = cva('', {
  variants: {
    size: {
      sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl',
      '2xl': 'text-2xl', '3xl': 'text-3xl', '4xl': 'text-4xl', '5xl': 'text-5xl', '6xl': 'text-6xl',
    },
    weight: {
      light: 'font-light', regular: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold',
    },
    tone: {
      default:  'text-primary',
      muted:    'text-secondary',
      subtle:   'text-tertiary',
      disabled: 'text-disabled',
      inverse:  'text-inverse',
      brand:    'text-brand',
      link:     'text-link',
      // A brand→secondary gradient clipped to the glyphs — for hero/display type.
      gradient: 'bg-gradient-to-r from-brand to-brand-secondary bg-clip-text text-transparent',
    },
    align:    { left: 'text-left', center: 'text-center', right: 'text-right' },
    truncate: { true: 'truncate', false: '' },
    mono:     { true: 'font-mono', false: '' },
    // `variant="inline-code"` renders a <code> element styled as inline code:
    // monospace, a subtle fill, em-sized so it scales with the surrounding text.
    // Listed last so its text-size wins; no horizontal padding so it hugs the text.
    variant: {
      'inline-code': 'rounded border border-subtle bg-surface-inset py-0.5 font-mono text-[0.875em] text-primary',
    },
  },
  defaultVariants: { size: 'base', tone: 'default' },
})

export interface TextProps extends NoStyle<React.HTMLAttributes<HTMLElement>>, VariantProps<typeof text> {
  asChild?: boolean
  /** Render inline as a `<span>` instead of a block `<p>` — for labels, chips and text inside flex rows. */
  span?: boolean
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ asChild, span, size, weight, tone, align, truncate, mono, variant, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : span ? 'span' : variant === 'inline-code' ? 'code' : 'p'
    return (
      <Comp
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(text({ size, weight, tone, align, truncate, mono, variant }))}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'

/**
 * Headings — semantic `H1`–`H6` components. Each picks the right element and a
 * sensible default size; override `size`/`weight`/`tone` to decouple visual
 * scale from document outline.
 *
 *   <H1>Page title</H1>
 *   <H3 size="lg">Section</H3>
 */
export interface HeadingProps
  extends NoStyle<React.HTMLAttributes<HTMLHeadingElement>>,
    Pick<VariantProps<typeof text>, 'size' | 'weight' | 'tone' | 'align' | 'truncate'> {}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
const HEADING_SIZE: Record<HeadingLevel, NonNullable<VariantProps<typeof text>['size']>> = {
  1: '3xl', 2: '2xl', 3: 'xl', 4: 'lg', 5: 'base', 6: 'sm',
}

function createHeading(level: HeadingLevel) {
  const Tag = `h${level}` as const
  const Component = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ size, weight = 'bold', tone, align, truncate, ...props }, ref) => (
      <Tag
        ref={ref}
        className={cn(text({ size: size ?? HEADING_SIZE[level], weight, tone, align, truncate }), 'tracking-tight')}
        {...props}
      />
    ),
  )
  Component.displayName = `H${level}`
  return Component
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)

export { text as textVariants }
