import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import { focusRingInset } from '../lib/recipes'

/**
 * Calendar — the date grid (react-day-picker), styled entirely from tokens (no
 * vendor CSS imported). Use it directly for inline pickers and ranges, or via the
 * DatePicker (which pairs it with a Popover + field). Pass any react-day-picker
 * prop — `mode="single" | "range" | "multiple"`, `selected`, `onSelect`, etc.
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>

const navButton = cn(
  'inline-flex h-7 w-7 items-center justify-center rounded-md border border-strong bg-surface text-primary',
  'transition-colors hover:bg-surface-subtle disabled:opacity-40 disabled:pointer-events-none',
  focusRingInset,
)

export function Calendar({ showOutsideDays = true, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className="p-3"
      classNames={{
        months: 'flex flex-col gap-4',
        month: 'flex flex-col gap-3',
        month_caption: 'relative flex h-7 items-center justify-center',
        caption_label: 'text-sm font-medium text-primary',
        nav: 'absolute inset-x-0 flex items-center justify-between',
        button_previous: navButton,
        button_next: navButton,
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'w-9 text-sm font-normal text-tertiary',
        week: 'mt-1 flex w-full',
        day: 'relative h-9 w-9 p-0 text-center text-sm text-primary',
        day_button: cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors',
          'hover:bg-surface-inset', focusRingInset,
        ),
        today: 'font-semibold underline underline-offset-4',
        selected: '[&_button]:bg-surface-inverse [&_button]:text-inverse [&_button:hover]:bg-surface-inverse',
        outside: 'text-disabled',
        disabled: 'text-disabled opacity-50',
        range_start: 'rounded-l-md bg-surface-inset [&_button]:bg-surface-inverse [&_button]:text-inverse',
        range_end: 'rounded-r-md bg-surface-inset [&_button]:bg-surface-inverse [&_button]:text-inverse',
        range_middle: 'rounded-none bg-surface-inset [&_button]:bg-transparent [&_button]:text-primary',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'
