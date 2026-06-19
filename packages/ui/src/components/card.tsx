import * as React from 'react'
import { Box, type BoxProps } from './layout'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * Card — a surface that groups related content. Pass `title`, `description`,
 * an optional `headerAction` (e.g. a Badge opposite the title), `footer`
 * actions, and the body as `children`; there are no sub-components to assemble.
 * Under the hood it's a `Box` with the universal surface preset, so any Box prop
 * (`boxShadow`, `borderRadius`, …) still applies.
 *
 *   <Card title="Deploy preview" description="Pushed 4 minutes ago"
 *         footer={<Button>Visit preview</Button>}>
 *     Vercel finished building your branch.
 *   </Card>
 */
// Card owns its padding (the header/body/footer sections carry it) so it can
// never double up against the outer surface Box. `padding` overrides the
// section inset on the spacing scale; default `lg` keeps the original 24px look.
type CardPadding = NonNullable<BoxProps['padding']>
const SECTION_PADDING: Record<CardPadding, string> = {
  none: 'p-none', xs: 'p-xs', sm: 'p-sm', md: 'p-md', lg: 'p-lg', xl: 'p-xl', '2xl': 'p-2xl',
  nbsp: 'p-nbsp', card: 'p-card', gutter: 'p-gutter', section: 'p-section', page: 'p-page',
}

export interface CardProps extends Omit<NoStyle<BoxProps>, 'title' | 'paddingX' | 'paddingY'> {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Trailing header content — sits opposite the title (e.g. a status Badge). */
  headerAction?: React.ReactNode
  /** Footer content — typically buttons. */
  footer?: React.ReactNode
  /** Inset for the header/body/footer sections. Overrides (never stacks on) the
   *  default; defaults to the `card` spacing token. */
  padding?: CardPadding
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, headerAction, footer, children, padding = 'card', ...props }, ref) => {
    const hasHeader = title != null || description != null || headerAction != null
    const pad = SECTION_PADDING[padding]
    return (
      <Box
        ref={ref}
        background="surface"
        border="default"
        borderRadius="2xl"
        boxShadow="sm"
        className={cn('text-primary')}
        {...props}
      >
        {hasHeader && (
          <div className={cn('flex flex-col gap-1.5', pad)}>
            {(title != null || headerAction != null) && (
              <div className={cn('flex items-center justify-between gap-3')}>
                {title != null && <div className={cn('text-lg font-semibold leading-snug tracking-tight')}>{title}</div>}
                {headerAction}
              </div>
            )}
            {description != null && <div className={cn('text-sm text-primary')}>{description}</div>}
          </div>
        )}
        {children != null && <div className={cn(pad, hasHeader && 'pt-0')}>{children}</div>}
        {footer != null && (
          <div className={cn('flex items-center gap-3', pad, (hasHeader || children != null) && 'pt-0')}>{footer}</div>
        )}
      </Box>
    )
  },
)
Card.displayName = 'Card'
