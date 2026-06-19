import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingInset } from '../lib/recipes'

/**
 * Link — an inline anchor in the link color (blue). Use `asChild` to wrap a
 * router link while keeping the styling:  <Link asChild><RouterLink to="…"/></Link>
 */
const link = cva(
  'text-link underline-offset-2 hover:text-link-hover hover:underline rounded-sm ' +
    'transition-colors ' + focusRingInset,
  {
    variants: {
      underline: { hover: '', always: 'underline', none: 'no-underline hover:no-underline' },
    },
    defaultVariants: { underline: 'hover' },
  },
)

export interface LinkProps
  extends NoStyle<React.AnchorHTMLAttributes<HTMLAnchorElement>>,
    VariantProps<typeof link> {
  asChild?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ asChild, underline, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return <Comp ref={ref} className={cn(link({ underline }))} {...props} />
  },
)
Link.displayName = 'Link'

export { link as linkVariants }
