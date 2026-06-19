import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { menuItem, overlayBackdrop } from '../lib/recipes'

/**
 * Command — a fast, filterable command menu / palette (cmdk under the hood),
 * token-styled to match the system. Compose `Command` > `CommandInput` +
 * `CommandList` (`CommandEmpty`/`CommandGroup`/`CommandItem`/`CommandSeparator`),
 * or drop the whole thing into `CommandDialog` for a ⌘K palette.
 *
 *   <CommandDialog open={open} onOpenChange={setOpen}>
 *     <CommandInput placeholder="Type a command…" />
 *     <CommandList>
 *       <CommandEmpty>No results.</CommandEmpty>
 *       <CommandGroup heading="Actions">
 *         <CommandItem onSelect={…}>New file</CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </CommandDialog>
 */
export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive>>
>(({ ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn('flex h-full w-full flex-col overflow-hidden rounded-xl bg-surface text-primary')}
    {...props}
  />
))
Command.displayName = 'Command'

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>>
>(({ ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-border px-3">
    <Search className="size-4 shrink-0 text-tertiary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-11 w-full bg-transparent py-3 text-sm text-primary outline-none placeholder:text-tertiary',
        'disabled:cursor-not-allowed disabled:opacity-50',
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = 'CommandInput'

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>>
>(({ ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn('max-h-80 overflow-y-auto overflow-x-hidden p-1')} {...props} />
))
CommandList.displayName = 'CommandList'

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>>
>(({ ...props }, ref) => (
  <CommandPrimitive.Empty ref={ref} className={cn('py-6 text-center text-sm text-tertiary')} {...props} />
))
CommandEmpty.displayName = 'CommandEmpty'

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>>
>(({ ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'overflow-hidden p-1 text-primary',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-tertiary',
    )}
    {...props}
  />
))
CommandGroup.displayName = 'CommandGroup'

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>>
>(({ ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-border')} {...props} />
))
CommandSeparator.displayName = 'CommandSeparator'

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  NoStyle<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>>
>(({ ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      menuItem,
      'gap-2 px-2 py-2 text-primary [&_svg]:size-4 [&_svg]:text-secondary',
      'data-[selected=true]:bg-surface-inset data-[selected=true]:text-primary',
    )}
    {...props}
  />
))
CommandItem.displayName = 'CommandItem'

export function CommandShortcut({ ...props }: NoStyle<React.HTMLAttributes<HTMLSpanElement>>) {
  return <span className={cn('ml-auto text-sm tracking-widest text-tertiary')} {...props} />
}

export interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  /** Accessible label for the palette dialog. */
  label?: string
}

export function CommandDialog({ open, onOpenChange, children, label = 'Command palette' }: CommandDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cn(overlayBackdrop)} />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden',
            'rounded-2xl border border-border bg-surface shadow-xl animate-scale-in',
          )}
        >
          <DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
          <Command>{children}</Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
