import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>> & {
    value?: number
    /** Looping animation for work of unknown duration; ignores `value`. */
    indeterminate?: boolean
  }
>(({ value = 0, indeterminate, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={indeterminate ? null : value}
    className={cn('relative h-2 w-full overflow-hidden rounded-full bg-surface-track')}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'h-full bg-surface-inverse',
        indeterminate
          ? 'w-2/5 rounded-full animate-progress-indeterminate'
          : 'w-full flex-1 transition-transform duration-slow',
      )}
      style={indeterminate ? undefined : { transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName
