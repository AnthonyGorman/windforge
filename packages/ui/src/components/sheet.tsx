import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { overlayBackdrop, dismissButton, focusRingInset } from '../lib/recipes'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close
export const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(overlayBackdrop)} {...props} />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-surface shadow-xl transition ease-in-out',
  {
    variants: {
      side: {
        top:    'inset-x-0 top-0 border-b border-border',
        bottom: 'inset-x-0 bottom-0 border-t border-border',
        left:   'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-border',
        right:  'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-border',
      },
    },
    defaultVariants: { side: 'right' },
  },
)

/**
 * SheetContent — the sliding panel. Pass `title`, `description`, and `footer`
 * actions as props (no header/title/footer sub-components to assemble); the
 * body goes in `children`. `title`/`description` render as accessible Radix
 * Dialog nodes.
 */
export interface SheetContentProps
  extends Omit<NoStyle<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>, 'title'>,
    VariantProps<typeof sheetVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Footer content pinned to the bottom — typically buttons. */
  footer?: React.ReactNode
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', title, description, footer, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), 'flex flex-col p-6 animate-fade-in')} {...props}>
      {(title != null || description != null) && (
        <div className={cn('flex flex-col gap-1.5')}>
          {title != null && (
            <DialogPrimitive.Title className={cn('text-lg font-semibold text-primary')}>{title}</DialogPrimitive.Title>
          )}
          {description != null && (
            <DialogPrimitive.Description className={cn('text-sm text-primary')}>{description}</DialogPrimitive.Description>
          )}
        </div>
      )}
      {children}
      {footer != null && <div className={cn('mt-auto flex flex-col gap-2')}>{footer}</div>}
      <DialogPrimitive.Close
        className={cn(dismissButton, 'focus:outline-none', focusRingInset)}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName
