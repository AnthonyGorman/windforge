import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

/**
 * DETERMINISTIC LAYOUT PRIMITIVES — `Box` and `Stack`.
 *
 * Layout is a CLOSED set of intent-named, conventionally-named props, not free-form
 * CSS. An AI (or a human) picks from a finite vocabulary — `direction="row"`,
 * `gap="card"`, `padding="lg"`, `borderRadius="xl"` — and `cva` maps each choice to
 * exactly one on-scale Tailwind class at build time. There is no path to an
 * off-scale value like `padding-[13px]` or a random hex, so output is always
 * on-system and reviewable.
 *
 * No JS runtime: thin wrappers that concatenate class strings — no `sx`-style
 * computation at render.
 *
 * Spacing accepts the generic steps (none·xs·sm·md·lg·xl·2xl) AND the practical
 * Windforge spacing tokens (nbsp·card·gutter·section·page).
 *
 *   <Box padding="lg" background="subtle" borderRadius="xl" border="default">…</Box>
 *   <Stack direction="row" gap="card" align="center" justify="between">…</Stack>
 *
 * `asChild` makes either polymorphic (the replacement for MUI `component=`):
 *   <Box asChild padding="md"><section/></Box>
 */

// NOTE: every class below is a complete literal string — required so Tailwind's
// content scanner emits it. Do not build these with template strings.

// ── shared surface vocabulary (padding + the box look) ──────────────────────────
const surface = cva('', {
  variants: {
    padding: {
      none: 'p-none', xs: 'p-xs', sm: 'p-sm', md: 'p-md', lg: 'p-lg', xl: 'p-xl', '2xl': 'p-2xl',
      nbsp: 'p-nbsp', card: 'p-card', gutter: 'p-gutter', section: 'p-section', page: 'p-page',
    },
    paddingX: {
      none: 'px-none', xs: 'px-xs', sm: 'px-sm', md: 'px-md', lg: 'px-lg', xl: 'px-xl', '2xl': 'px-2xl',
      nbsp: 'px-nbsp', card: 'px-card', gutter: 'px-gutter', section: 'px-section', page: 'px-page',
    },
    paddingY: {
      none: 'py-none', xs: 'py-xs', sm: 'py-sm', md: 'py-md', lg: 'py-lg', xl: 'py-xl', '2xl': 'py-2xl',
      nbsp: 'py-nbsp', card: 'py-card', gutter: 'py-gutter', section: 'py-section', page: 'py-page',
    },
    background: {
      none:    '',
      surface: 'bg-surface',
      subtle:  'bg-surface-subtle',
      inset:   'bg-surface-inset',
      inverse: 'bg-surface-inverse text-inverse',
      brand:   'bg-brand-subtle',
    },
    border:       { none: '', default: 'border border-border', subtle: 'border border-subtle', strong: 'border border-strong' },
    borderRadius: { none: 'rounded-none', sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl', '2xl': 'rounded-2xl', full: 'rounded-full' },
    boxShadow:    { none: 'shadow-none', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl' },
    // Page-width constraint (absorbs the old Container). Pair with className="mx-auto" to center.
    maxWidth:     { sm: 'max-w-2xl', md: 'max-w-4xl', lg: 'max-w-6xl', xl: 'max-w-7xl', prose: 'max-w-prose', full: 'max-w-none' },
  },
})

type SurfaceProps = VariantProps<typeof surface>

// ── flex vocabulary (Stack only) ────────────────────────────────────────────────
const flex = cva('flex', {
  variants: {
    direction: { row: 'flex-row', column: 'flex-col' },
    gap: {
      none: 'gap-none', xs: 'gap-xs', sm: 'gap-sm', md: 'gap-md', lg: 'gap-lg', xl: 'gap-xl', '2xl': 'gap-2xl',
      nbsp: 'gap-nbsp', card: 'gap-card', gutter: 'gap-gutter', section: 'gap-section', page: 'gap-page',
    },
    align:   { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch', baseline: 'items-baseline' },
    justify: { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' },
    wrap:    { true: 'flex-wrap', false: 'flex-nowrap' },
  },
  defaultVariants: { direction: 'column', gap: 'md' },
})

type FlexProps = VariantProps<typeof flex>

// ── Box: a padded, optionally-surfaced container (the everyday <div>) ────────────
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, SurfaceProps {
  asChild?: boolean
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, asChild, padding, paddingX, paddingY, background, border, borderRadius, boxShadow, maxWidth, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(surface({ padding, paddingX, paddingY, background, border, borderRadius, boxShadow, maxWidth }), className)}
        {...props}
      />
    )
  },
)
Box.displayName = 'Box'

// ── Stack: a flex Box — the deterministic way to arrange items ───────────────────
export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, FlexProps, SurfaceProps {
  asChild?: boolean
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { className, asChild, direction, gap, align, justify, wrap,
      padding, paddingX, paddingY, background, border, borderRadius, boxShadow, maxWidth, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          flex({ direction, gap, align, justify, wrap }),
          surface({ padding, paddingX, paddingY, background, border, borderRadius, boxShadow, maxWidth }),
          className,
        )}
        {...props}
      />
    )
  },
)
Stack.displayName = 'Stack'

// ── Grid: a closed-vocabulary CSS grid (responsive cols + on-scale gap) ──────────
const grid = cva('grid', {
  variants: {
    cols: {
      1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
      5: 'grid-cols-5', 6: 'grid-cols-6', 12: 'grid-cols-12',
    },
    // responsive breakpoint at md — the common "stack on mobile, grid on desktop"
    mdCols: {
      1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4',
      5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12',
    },
    gap: {
      none: 'gap-none', xs: 'gap-xs', sm: 'gap-sm', md: 'gap-md', lg: 'gap-lg', xl: 'gap-xl', '2xl': 'gap-2xl',
      nbsp: 'gap-nbsp', card: 'gap-card', gutter: 'gap-gutter', section: 'gap-section', page: 'gap-page',
    },
    align:   { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' },
    justify: { start: 'justify-items-start', center: 'justify-items-center', end: 'justify-items-end', stretch: 'justify-items-stretch' },
  },
  defaultVariants: { cols: 1, gap: 'md' },
})

export interface GridProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof grid> {
  asChild?: boolean
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, asChild, cols, mdCols, gap, align, justify, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return <Comp ref={ref} className={cn(grid({ cols, mdCols, gap, align, justify }), className)} {...props} />
  },
)
Grid.displayName = 'Grid'

/**
 * The machine-readable layout contract. An AI/registry reads this to know the
 * exact allowed values for every layout prop — so generated layouts are picked
 * from a closed set, never invented. Spacing mixes generic steps with the
 * practical Windforge spacing tokens.
 */
export const layoutVocabulary = {
  spacing:      ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'nbsp', 'card', 'gutter', 'section', 'page'],
  direction:    ['row', 'column'],
  align:        ['start', 'center', 'end', 'stretch', 'baseline'],
  justify:      ['start', 'center', 'end', 'between', 'around'],
  background:   ['none', 'surface', 'subtle', 'inset', 'inverse', 'brand'],
  border:       ['none', 'default', 'subtle', 'strong'],
  borderRadius: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
  boxShadow:    ['none', 'sm', 'md', 'lg', 'xl'],
  maxWidth:     ['sm', 'md', 'lg', 'xl', 'prose', 'full'],
  gridCols: [1, 2, 3, 4, 5, 6, 12],
} as const
