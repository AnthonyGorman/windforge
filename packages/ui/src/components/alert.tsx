import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

// Text stays the normal foreground in every variant — only the icon carries the
// status hue. The fill is a faint status tint (the `-subtle` token), paired with
// a status-colored outline in both modes so the alert reads as a distinct
// surface — light over white, dark over the near-black background.
const alertVariants = cva(
  'relative w-full rounded-xl border p-4 flex gap-3 text-primary [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:mt-0.5',
  {
    variants: {
      variant: {
        neutral: 'border-border bg-surface [&_svg]:text-secondary',
        info:    'border-info bg-info-subtle [&_svg]:text-info',
        success: 'border-success bg-success-subtle [&_svg]:text-success',
        warning: 'border-warning bg-warning-subtle [&_svg]:text-warning',
        error:   'border-error bg-error-subtle [&_svg]:text-error',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

/**
 * Alert — an inline status message. Pass `title`, `description`, an optional
 * leading `icon`, and optional `actions`; there are no sub-components to
 * assemble. For a fully custom body, use `children` instead of `description`.
 *
 *   <Alert variant="info" icon={<Info />} title="Heads up"
 *          description="Your trial ends in 5 days." />
 */
export interface AlertProps
  extends Omit<NoStyle<React.HTMLAttributes<HTMLDivElement>>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Leading status icon (a lucide element). Inherits the variant hue. */
  icon?: React.ReactNode
  /** Trailing actions — typically buttons or links. */
  actions?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, title, description, icon, actions, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }))} {...props}>
      {icon}
      <div className="min-w-0 flex-1">
        {title && <h5 className={cn('mb-0.5 font-semibold leading-snug')}>{title}</h5>}
        {description && <div className={cn('text-sm text-primary')}>{description}</div>}
        {children}
        {actions && <div className="mt-3 flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </div>
  ),
)
Alert.displayName = 'Alert'
