import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Modal, ModalTrigger, ModalContent, type ModalContentProps } from './modal'
import { cn } from '../lib/utils'

/**
 * Dialog — the opinionated, props-based convenience built on `Modal`. Pass
 * `title`, `description`, and `actions` (buttons) as nodes; body goes in
 * `children`. There are no header/title/footer sub-components to assemble — for
 * full control over structure, drop down to the `Modal` primitives directly.
 *
 *   <Dialog
 *     trigger={<Button>Delete</Button>}
 *     title="Delete project?"
 *     description="This can't be undone."
 *     actions={<><Button variant="secondary">Cancel</Button><Button variant="destructive">Delete</Button></>}
 *   />
 */
export interface DialogProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** Footer content — typically buttons. */
  actions?: React.ReactNode
  /** The element that opens the dialog. Omit for fully controlled use. */
  trigger?: React.ReactNode
  children?: React.ReactNode
  size?: ModalContentProps['size']
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({
  title, description, actions, trigger, children, size, open, defaultOpen, onOpenChange,
}: DialogProps) {
  return (
    <Modal open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
      <ModalContent size={size}>
        <div className={cn('flex flex-col gap-1.5 text-left')}>
          <DialogPrimitive.Title className={cn('text-lg font-semibold leading-snug tracking-tight')}>
            {title}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description className={cn('text-sm text-primary')}>
              {description}
            </DialogPrimitive.Description>
          )}
        </div>
        {children}
        {actions && (
          <div className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end')}>{actions}</div>
        )}
      </ModalContent>
    </Modal>
  )
}
