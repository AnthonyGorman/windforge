import * as React from 'react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * ButtonGroup — joins a row of Buttons into one segmented control: shared edges,
 * single outer radius, collapsed seams. Put `<Button>`s (any variant) inside.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, NoStyle<React.HTMLAttributes<HTMLDivElement>>>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        'inline-flex isolate',
        '[&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg',
        '[&>*:not(:first-child)]:-ml-px hover:[&>*]:z-10 focus-visible:[&>*]:z-10',
      )}
      {...props}
    />
  ),
)
ButtonGroup.displayName = 'ButtonGroup'
