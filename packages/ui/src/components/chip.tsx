import * as React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingInset } from '../lib/recipes'

/**
 * Chip — an interactive pill: clickable (filter/selection) and optionally
 * deletable. Distinct from `Badge`, which is a static label. Set `selected` for
 * the active state and pass `onDelete` to show a trailing ✕.
 */
const chip = cva(
  'inline-flex items-center gap-1.5 rounded-full border text-sm font-medium transition-colors ' +
    '[&_svg]:size-3.5 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      selected: {
        true:  'border-transparent bg-surface-inverse text-inverse',
        false: 'border-strong bg-surface text-primary hover:bg-surface-subtle',
      },
      clickable: { true: 'cursor-pointer ' + focusRingInset, false: '' },
      size: {
        sm: 'px-2 py-0.5',
        md: 'px-3 py-1',
      },
    },
    defaultVariants: { selected: false, clickable: false, size: 'md' },
  },
)

export interface ChipProps
  extends NoStyle<Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>>,
    VariantProps<typeof chip> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /** When provided, renders a trailing ✕ that calls this instead of selecting. */
  onDelete?: () => void
  disabled?: boolean
  icon?: React.ReactNode
}

export const Chip = React.forwardRef<HTMLElement, ChipProps>(
  ({ selected, size, onClick, onDelete, disabled, icon, children, ...props }, ref) => {
    const clickable = !!onClick
    const Comp: React.ElementType = clickable ? 'button' : 'span'
    return (
      <Comp
        ref={ref as never}
        className={cn(chip({ selected, clickable, size }))}
        {...(clickable ? { type: 'button', onClick, disabled, 'aria-pressed': !!selected } : {})}
        {...props}
      >
        {icon}
        {children}
        {onDelete && (
          <button
            type="button"
            aria-label="Remove"
            disabled={disabled}
            onClick={(event) => {
              event.stopPropagation()
              onDelete()
            }}
            className={cn('-mr-1 ml-0.5 rounded-full p-0.5 opacity-70 hover:opacity-100', focusRingInset)}
          >
            <X />
          </button>
        )}
      </Comp>
    )
  },
)
Chip.displayName = 'Chip'

export { chip as chipVariants }
