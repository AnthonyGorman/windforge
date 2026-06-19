import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>
>(({ orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
    )}
    {...props}
  />
))
Separator.displayName = SeparatorPrimitive.Root.displayName
