import * as React from 'react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingField } from '../lib/recipes'

export interface TextareaProps extends NoStyle<React.TextareaHTMLAttributes<HTMLTextAreaElement>> {
  /** Error state — red control outline + aria-invalid. Usually set for you by FormField. */
  invalid?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'flex min-h-20 w-full rounded-lg border border-strong bg-surface px-3 py-2 text-sm text-primary',
        'transition-colors placeholder:text-tertiary',
        focusRingField,
        'disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-error focus-visible:border-error',
      )}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'
