import * as React from 'react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * Skeleton — a fluid loading placeholder. It fills its parent (`h-full w-full`),
 * so you size it by wrapping it in a Box: `<Box className="h-4 w-2/3"><Skeleton/></Box>`.
 */
export function Skeleton({ ...props }: NoStyle<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn('h-full w-full animate-pulse rounded-md bg-surface-inset')} {...props} />
}
