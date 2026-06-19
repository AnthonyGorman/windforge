import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { floatingPanel, menuItem } from '../lib/recipes'

/**
 * MultiSelect — a searchable multi-value combobox. Selected values render as
 * removable tags in the field; the dropdown filters as you type and toggles
 * options with the keyboard (↑/↓ move, Enter toggles, Backspace removes the last
 * tag on an empty query). Controlled via `value`/`onValueChange`. Shares the Radix
 * popper and floating-panel recipe with Select/Autocomplete.
 */
export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  placeholder?: string
  emptyText?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
  'aria-describedby'?: string
}

export function MultiSelect({
  options, value, onValueChange, placeholder = 'Select…', emptyText = 'No results',
  disabled, invalid, id, 'aria-describedby': ariaDescribedBy,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [highlight, setHighlight] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const listId = React.useId()

  const selectedOptions = value
    .map((v) => options.find((o) => o.value === v))
    .filter((o): o is MultiSelectOption => !!o)
  const filtered = React.useMemo(
    () => (query ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())) : options),
    [query, options],
  )

  React.useEffect(() => {
    setHighlight((c) => Math.min(c, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  const toggle = (v: string) =>
    onValueChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      setHighlight((c) => Math.min(c + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((c) => Math.max(c - 1, 0))
    } else if (event.key === 'Enter' && open && filtered[highlight]) {
      event.preventDefault()
      toggle(filtered[highlight].value)
    } else if (event.key === 'Backspace' && !query && value.length) {
      onValueChange(value.slice(0, -1))
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const optionId = (i: number) => `${listId}-opt-${i}`

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Anchor asChild>
        <div
          ref={anchorRef}
          className={cn(
            'flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-lg border border-strong bg-surface px-2 py-1.5 text-sm text-primary',
            'focus-within:border-focus focus-within:ring-2 focus-within:ring-ring',
            disabled && 'pointer-events-none opacity-50',
            invalid && 'border-error focus-within:border-error',
          )}
          onMouseDown={(e) => {
            // Clicking the field (not a tag's ✕) focuses the input and opens.
            if (e.target === e.currentTarget) inputRef.current?.focus()
          }}
        >
          {selectedOptions.map((o) => (
            <span
              key={o.value}
              className="inline-flex items-center gap-1 rounded-full border border-transparent bg-surface-inset px-2 py-0.5 text-sm text-primary"
            >
              {o.label}
              <button
                type="button"
                aria-label={`Remove ${o.label}`}
                onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
                onClick={() => toggle(o.value)}
                className="rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3"
              >
                <X />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            id={id}
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            aria-activedescendant={open && filtered[highlight] ? optionId(highlight) : undefined}
            disabled={disabled}
            value={query}
            placeholder={selectedOptions.length ? '' : placeholder}
            onChange={(e) => { setQuery(e.target.value); setHighlight(0); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            className="min-w-16 flex-1 bg-transparent placeholder:text-tertiary outline-none"
          />
          <ChevronsUpDown className="size-4 shrink-0 text-tertiary" />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          role="listbox"
          aria-multiselectable
          id={listId}
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          // Clicking/typing in the field itself isn't "outside" — only a real
          // outside interaction should dismiss. Without this the open-on-focus and
          // the click's pointer-down race, so the list flashes open then closes.
          onInteractOutside={(event) => {
            const target = event.detail.originalEvent.target as Node | null
            if (target && anchorRef.current?.contains(target)) event.preventDefault()
          }}
          className={cn(floatingPanel, 'max-h-60 w-[var(--radix-popover-trigger-width)] overflow-auto p-1 shadow-lg animate-scale-in')}
        >
          {filtered.length === 0 ? (
            <div className="px-2 py-1.5 text-sm text-tertiary">{emptyText}</div>
          ) : (
            filtered.map((option, index) => {
              const isSelected = value.includes(option.value)
              return (
                <div
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(index)}
                  onMouseDown={(e) => { e.preventDefault(); toggle(option.value) }}
                  className={cn(menuItem, 'gap-2 px-2 py-1.5', index === highlight ? 'bg-surface-inset text-primary' : 'text-secondary')}
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
