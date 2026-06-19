import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { overlayBackdrop, dismissButton, focusRingInset } from '../lib/recipes'

/**
 * Modal — the low-level, fully composable overlay primitive (Radix Dialog under
 * the hood). Compose freely: `Modal > ModalTrigger + ModalContent`. For the
 * common title/description/actions case, reach for `Dialog`, the props-based
 * convenience built on this — there are no header/title/footer sub-components.
 */
export const Modal = DialogPrimitive.Root
export const ModalTrigger = DialogPrimitive.Trigger
export const ModalClose = DialogPrimitive.Close
export const ModalPortal = DialogPrimitive.Portal

export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  NoStyle<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn(overlayBackdrop)} {...props} />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const modalContent = cva(
  'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 ' +
    'rounded-2xl border border-border bg-surface p-6 shadow-xl animate-scale-in',
  {
    variants: {
      size: { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface ModalContentProps
  extends NoStyle<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>,
    VariantProps<typeof modalContent> {
  /** Hide the default corner close button. */
  hideClose?: boolean
}

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ children, size, hideClose, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content ref={ref} className={cn(modalContent({ size }))} {...props}>
      {children}
      {!hideClose && (
        <DialogPrimitive.Close
          className={cn(dismissButton, 'hover:bg-surface-inset focus:outline-none', focusRingInset)}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = DialogPrimitive.Content.displayName

export { modalContent }
