import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRing } from '../lib/recipes'

/**
 * Button — emphasis comes from a three-tier hierarchy (primary / secondary /
 * tertiary), never from hue. `destructive` is the one semantic exception.
 * Every colour is a token; nothing here is a raw value.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-nbsp whitespace-nowrap rounded-lg font-medium ' +
    'transition-colors duration-normal ' + focusRing + ' ' +
    'disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:     'bg-brand text-contrast hover:bg-brand-hover active:bg-brand-active shadow-xs',
        secondary:   'border-[length:var(--wf-border-width-control)] border-strong bg-surface text-primary hover:bg-surface-subtle active:bg-surface-inset',
        tertiary:    'text-primary hover:bg-surface-inset active:bg-surface-inset',
        link:        'text-link underline-offset-4 hover:underline hover:text-link-hover',
        destructive: 'border-[length:var(--wf-border-width-control)] border-error bg-surface text-error hover:bg-error-subtle active:bg-error-muted',
      },
      size: {
        sm:   'h-8 px-3 text-sm',
        md:   'h-10 px-4 text-sm',
        lg:   'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends NoStyle<React.ButtonHTMLAttributes<HTMLButtonElement>>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }))} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
