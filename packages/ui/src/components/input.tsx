import * as React from 'react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingField } from '../lib/recipes'

export interface InputProps extends NoStyle<React.InputHTMLAttributes<HTMLInputElement>> {
  /** Error state — red control outline + aria-invalid. Usually set for you by FormField. */
  invalid?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, invalid, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'flex h-10 w-full rounded-lg border border-strong bg-surface px-3 py-2 text-sm text-primary',
        'transition-colors placeholder:text-tertiary',
        focusRingField,
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-primary',
        invalid && 'border-error focus-visible:border-error',
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'
