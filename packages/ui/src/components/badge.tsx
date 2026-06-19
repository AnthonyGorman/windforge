import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-lg border font-medium transition-colors [&_svg]:size-3',
  {
    variants: {
      variant: {
        brand:   'border-transparent bg-brand text-contrast',
        subtle:  'border-transparent bg-brand-subtle text-brand',
        neutral: 'border-border bg-surface-subtle text-secondary',
        outline: 'border-strong text-primary',
        success: 'border-transparent bg-success-subtle text-primary',
        warning: 'border-transparent bg-warning-subtle text-primary',
        error:   'border-transparent bg-error-subtle text-primary',
        info:    'border-transparent bg-info-subtle text-primary',
      },
      size: {
        sm: 'px-2 py-0.5 text-sm',
        md: 'px-2.5 py-0.5 text-sm',
      },
    },
    defaultVariants: { variant: 'neutral', size: 'md' },
  },
)

export interface BadgeProps
  extends NoStyle<React.HTMLAttributes<HTMLSpanElement>>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }))} {...props} />
}

export { badgeVariants }
