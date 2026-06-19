import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>
>(({ ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    )}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
