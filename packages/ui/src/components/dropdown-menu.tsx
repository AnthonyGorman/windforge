import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { floatingPanel, menuItem } from '../lib/recipes'

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>>
>(({ sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(floatingPanel, 'min-w-48 overflow-hidden p-1 animate-scale-in')}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>> & { inset?: boolean }
>(({ inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      menuItem,
      'gap-2 px-2 py-1.5 focus:bg-surface-inset focus:text-primary [&_svg]:size-4',
      inset && 'pl-8',
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>>
>(({ children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(menuItem, 'py-1.5 pl-8 pr-2 focus:bg-surface-inset focus:text-primary')}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>>
>(({ children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(menuItem, 'py-1.5 pl-8 pr-2 focus:bg-surface-inset focus:text-primary')}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>> & { inset?: boolean }
>(({ inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold text-tertiary', inset && 'pl-8')}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border')} {...props} />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export function DropdownMenuShortcut({ ...props }: NoStyle<React.HTMLAttributes<HTMLSpanElement>>) {
  return <span className={cn('ml-auto text-sm tracking-widest text-tertiary')} {...props} />
}

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>> & { inset?: boolean }
>(({ inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(menuItem, 'px-2 py-1.5 focus:bg-surface-inset focus:text-primary', inset && 'pl-8')}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>
>(({ ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(floatingPanel, 'min-w-32 overflow-hidden p-1 animate-scale-in')}
    {...props}
  />
))
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

/**
 * DropdownMenu — pass a `trigger` and an `items` array for the common case (the
 * component renders the content, items, labels, and separators), or compose the
 * primitives (`DropdownMenuTrigger`/`DropdownMenuContent`/…) by hand for
 * submenus, checkbox/radio groups, and other advanced layouts.
 *
 *   <DropdownMenu trigger={<Button>Open</Button>} items={[
 *     { label: 'Profile', icon: <User />, shortcut: '⇧⌘P', onSelect: goProfile },
 *     { type: 'separator' },
 *     { label: 'Log out', onSelect: logout },
 *   ]} />
 */
export type DropdownMenuItemData =
  | {
      type?: 'item'
      label: React.ReactNode
      icon?: React.ReactNode
      shortcut?: string
      onSelect?: () => void
      disabled?: boolean
    }
  | { type: 'separator' }
  | { type: 'label'; label: React.ReactNode }

export interface DropdownMenuProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {
  /** The element that opens the menu (rendered via asChild). */
  trigger?: React.ReactNode
  /** Declarative items. Omit to compose the primitives as children instead. */
  items?: DropdownMenuItemData[]
}

export function DropdownMenu({ trigger, items, children, ...props }: DropdownMenuProps) {
  if (!items) return <DropdownMenuPrimitive.Root {...props}>{children}</DropdownMenuPrimitive.Root>
  return (
    <DropdownMenuPrimitive.Root {...props}>
      {trigger && <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>}
      <DropdownMenuContent>
        {items.map((item, i) => {
          if (item.type === 'separator') return <DropdownMenuSeparator key={i} />
          if (item.type === 'label') return <DropdownMenuLabel key={i}>{item.label}</DropdownMenuLabel>
          return (
            <DropdownMenuItem key={i} onSelect={item.onSelect} disabled={item.disabled}>
              {item.icon}
              {item.label}
              {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenuPrimitive.Root>
  )
}
