import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { floatingPanel, menuItem } from '../lib/recipes'

export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

/**
 * Select — pass an `options` array for the common case (the component renders
 * the trigger, value, and items), or compose `SelectTrigger`/`SelectContent`/
 * `SelectItem` by hand for groups, labels, or custom triggers. Value props
 * (`value`/`defaultValue`/`onValueChange`) pass through to the Radix root.
 *
 *   <Select placeholder="Pick one" options={[
 *     { value: 'a', label: 'Apple' },
 *     { value: 'b', label: 'Banana' },
 *   ]} />
 */
export interface SelectOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  /** Declarative options. Omit to compose the primitives as children instead. */
  options?: SelectOption[]
  placeholder?: string
  /** Error state — red trigger outline + aria-invalid. Usually set by FormField. */
  invalid?: boolean
  /** Forwarded to the trigger so FormField can wire label/description/error. */
  id?: string
  'aria-describedby'?: string
}

export function Select({ options, placeholder, invalid, id, children, ...props }: SelectProps) {
  if (!options) return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
  return (
    <SelectPrimitive.Root {...props}>
      <SelectTrigger invalid={invalid} id={id} aria-describedby={props['aria-describedby']}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value} disabled={o.disabled}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive.Root>
  )
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>> & { invalid?: boolean }
>(({ children, invalid, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      'flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-strong bg-surface px-3 py-2 text-sm text-primary',
      'placeholder:text-tertiary focus:outline-none focus:border-focus focus:ring-2 focus:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:text-tertiary',
      invalid && 'border-error focus:border-error',
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-60" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>
>(({ children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        floatingPanel,
        'relative max-h-96 min-w-32 overflow-hidden animate-scale-in',
        position === 'popper' && 'data-[side=bottom]:translate-y-1',
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn('p-1', position === 'popper' && 'w-full min-w-[var(--radix-select-trigger-width)]')}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>
>(({ ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold text-tertiary')} {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>
>(({ children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(menuItem, 'w-full py-1.5 pl-8 pr-2 focus:bg-surface-inset focus:text-primary')}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName
