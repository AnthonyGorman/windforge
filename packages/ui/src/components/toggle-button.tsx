import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingInset } from '../lib/recipes'

/**
 * ToggleButtonGroup / ToggleButton — a segmented control. `type="single"` keeps
 * one value selected; `type="multiple"` keeps an array. Controlled via
 * `value`/`onValueChange`. Buttons share edges like a ButtonGroup.
 */
type SingleProps = {
  type?: 'single'
  value: string | null
  onValueChange: (value: string | null) => void
}
type MultipleProps = {
  type: 'multiple'
  value: string[]
  onValueChange: (value: string[]) => void
}
export type ToggleButtonGroupProps = (SingleProps | MultipleProps) &
  NoStyle<Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>>

interface ToggleGroupValue {
  isSelected: (itemValue: string) => boolean
  toggle: (itemValue: string) => void
}
const ToggleGroupContext = React.createContext<ToggleGroupValue | null>(null)

export function ToggleButtonGroup({
  type = 'single', value, onValueChange, children, ...props
}: ToggleButtonGroupProps) {
  const contextValue = React.useMemo<ToggleGroupValue>(() => {
    if (type === 'multiple') {
      const values = (value as string[]) ?? []
      return {
        isSelected: (itemValue) => values.includes(itemValue),
        toggle: (itemValue) =>
          (onValueChange as MultipleProps['onValueChange'])(
            values.includes(itemValue) ? values.filter((existing) => existing !== itemValue) : [...values, itemValue],
          ),
      }
    }
    return {
      isSelected: (itemValue) => value === itemValue,
      toggle: (itemValue) => (onValueChange as SingleProps['onValueChange'])(value === itemValue ? null : itemValue),
    }
  }, [type, value, onValueChange])

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        role="group"
        className={cn(
          'inline-flex isolate',
          '[&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-px',
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

const toggleButton = cva(
  'inline-flex h-10 items-center justify-center gap-2 border border-strong px-4 text-sm font-medium transition-colors ' +
    'disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ' + focusRingInset,
  {
    variants: {
      selected: {
        true:  'z-10 bg-surface-inverse text-inverse border-transparent',
        false: 'bg-surface text-secondary hover:bg-surface-subtle hover:text-primary',
      },
    },
  },
)

export interface ToggleButtonProps extends NoStyle<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  value: string
}

export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ value, onClick, ...props }, ref) => {
    const group = React.useContext(ToggleGroupContext)
    const selected = group?.isSelected(value) ?? false
    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={selected}
        className={cn(toggleButton({ selected }))}
        onClick={(event) => {
          group?.toggle(value)
          onClick?.(event)
        }}
        {...props}
      />
    )
  },
)
ToggleButton.displayName = 'ToggleButton'
