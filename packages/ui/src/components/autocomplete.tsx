import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '../lib/utils'
import { floatingPanel, menuItem } from '../lib/recipes'

/**
 * Autocomplete — a searchable single-select combobox. Type to filter; arrow keys
 * move the highlight, Enter selects, Escape closes. Controlled via
 * `value`/`onValueChange`. Positioning/portalling come from the shared Radix
 * popper (same engine as Select/Tooltip/Popover); the combobox logic and
 * `listbox`/`option` ARIA are ours.
 */
export interface AutocompleteOption {
  value: string
  label: string
}
export interface AutocompleteProps {
  options: AutocompleteOption[]
  value?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  id?: string
  /** Error state — red field outline + aria-invalid. Usually set by FormField. */
  invalid?: boolean
  'aria-describedby'?: string
}

export function Autocomplete({
  options, value, onValueChange, placeholder = 'Search…', emptyText = 'No results', disabled, id,
  invalid, 'aria-describedby': ariaDescribedBy,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [highlight, setHighlight] = React.useState(0)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()

  const selected = options.find((option) => option.value === value) ?? null
  // When closed, the field shows the selected label; when open, the live query.
  const display = open ? query : selected?.label ?? ''
  const filtered = React.useMemo(
    () =>
      open && query
        ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
        : options,
    [open, query, options],
  )
  const optionId = (index: number) => `${listId}-opt-${index}`

  // Keep the highlight in range when the filtered set shrinks, so Enter never
  // selects a stale index and the highlighted row stays valid.
  React.useEffect(() => {
    setHighlight((current) => Math.min(current, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  const choose = (opt: AutocompleteOption) => {
    onValueChange?.(opt.value)
    setQuery('')
    setOpen(false)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      setHighlight((current) => Math.min(current + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((current) => Math.max(current - 1, 0))
    } else if (event.key === 'Enter') {
      if (open && filtered[highlight]) {
        event.preventDefault()
        choose(filtered[highlight])
      }
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div
          ref={anchorRef}
          className={cn(
            'flex h-10 items-center gap-2 rounded-lg border border-strong bg-surface px-3 text-sm text-primary',
            'focus-within:border-focus focus-within:ring-2 focus-within:ring-ring',
            disabled && 'opacity-50 pointer-events-none',
            invalid && 'border-error focus-within:border-error',
          )}
        >
          <input
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            aria-autocomplete="list"
            aria-activedescendant={open && filtered[highlight] ? optionId(highlight) : undefined}
            disabled={disabled}
            value={display}
            placeholder={placeholder}
            onChange={(event) => {
              setQuery(event.target.value)
              setHighlight(0)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent placeholder:text-tertiary outline-none"
          />
          <ChevronsUpDown className="size-4 shrink-0 text-tertiary" />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          // Override Radix's default role="dialog" — this is a combobox listbox.
          role="listbox"
          id={listId}
          align="start"
          sideOffset={4}
          // Keep focus on the input (it's the combobox); don't let the popover grab it.
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          // Clicking/focusing the field itself isn't "outside" — only real outside
          // interaction should dismiss.
          onInteractOutside={(event) => {
            const target = event.detail.originalEvent.target as Node | null
            if (target && anchorRef.current?.contains(target)) event.preventDefault()
          }}
          className={cn(
            floatingPanel,
            'max-h-60 w-[var(--radix-popover-trigger-width)] overflow-auto p-1 shadow-lg animate-scale-in',
          )}
        >
          {filtered.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-tertiary">{emptyText}</div>
          ) : (
            filtered.map((option, index) => {
              const isSelected = option.value === value
              return (
                <div
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(index)}
                  // preventDefault keeps focus on the input through the click.
                  onMouseDown={(event) => {
                    event.preventDefault()
                    choose(option)
                  }}
                  className={cn(
                    menuItem,
                    'gap-2 px-2 py-1.5',
                    index === highlight ? 'bg-surface-inset text-primary' : 'text-secondary',
                  )}
                >
                  <Check className={cn('size-4 shrink-0', isSelected ? 'opacity-100 text-primary' : 'opacity-0')} />
                  {option.label}
                </div>
              )
            })
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
