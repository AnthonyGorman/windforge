import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverTrigger } from './popover'
import { Calendar } from './calendar'
import { cn } from '../lib/utils'
import { focusRingField, floatingPanel } from '../lib/recipes'

/**
 * DatePicker — a single-date field: a token-styled trigger that opens the Calendar
 * in a Popover. Controlled via `value`/`onValueChange`. For ranges or multi-select,
 * use the Calendar directly inside a Popover.
 *
 *   <DatePicker value={date} onValueChange={setDate} />
 */
export interface DatePickerProps {
  value?: Date
  onValueChange?: (date?: Date) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
  'aria-describedby'?: string
  /** Intl format for the displayed value. Default { dateStyle: 'medium' }. */
  formatOptions?: Intl.DateTimeFormatOptions
}

export function DatePicker({
  value, onValueChange, placeholder = 'Pick a date', disabled, invalid, id,
  'aria-describedby': ariaDescribedBy, formatOptions = { dateStyle: 'medium' },
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const label = value ? new Intl.DateTimeFormat(undefined, formatOptions).format(value) : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          className={cn(
            'flex h-10 w-full items-center gap-2 rounded-lg border border-strong bg-surface px-3 text-left text-sm',
            'transition-colors hover:bg-surface-subtle',
            focusRingField,
            'disabled:cursor-not-allowed disabled:opacity-50',
            invalid && 'border-error focus-visible:border-error',
          )}
        >
          <CalendarIcon className="size-4 shrink-0 text-tertiary" />
          <span className={cn('flex-1', label ? 'text-primary' : 'text-tertiary')}>
            {label ?? placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          className={cn(floatingPanel, 'w-auto rounded-xl shadow-lg animate-scale-in')}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onValueChange?.(date)
              setOpen(false)
            }}
            autoFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </Popover>
  )
}
