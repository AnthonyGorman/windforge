import { type ReactNode } from 'react'
import { Box, cn } from '@windforge/ui'

/**
 * ExampleComponent: a labelled placeholder for *layout* demos (Box / Stack / Grid):
 * a brand-tinted fill with a dotted brand outline. It is fluid (`size-full`), so
 * it fills whatever layout wraps it. That's the whole point: you size a layout
 * by sizing the Box/Stack/Grid around it, not the box itself. Studio-only.
 */
export function ExampleComponent({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <Box
      className={cn(
        'grid size-full min-h-12 place-items-center rounded-lg border-2 border-dotted border-brand bg-brand-subtle p-3 text-sm font-medium text-brand',
        className,
      )}
    >
      {children}
    </Box>
  )
}
