import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingInset } from '../lib/recipes'

/**
 * Accordion — pass an `items` array for the common case (the component renders
 * each item, trigger, and panel), or compose `AccordionItem`/`AccordionTrigger`/
 * `AccordionContent` by hand. `type`/`collapsible`/`defaultValue` pass through
 * to the underlying Radix root.
 *
 *   <Accordion type="single" collapsible items={[
 *     { value: 'a', trigger: 'What is Windforge?', content: <p>…</p> },
 *   ]} />
 */
export interface AccordionItemData {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

// Keep the raw Radix union (single | multiple) and intersect — intersection
// distributes over the union, so the `type`/`collapsible` correlation survives.
export type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> & {
  /** Declarative items. Omit to compose the primitives as children instead. */
  items?: AccordionItemData[]
}

export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(({ items, children, ...props }, ref) => {
  if (!items) return <AccordionPrimitive.Root ref={ref} {...props}>{children}</AccordionPrimitive.Root>
  return (
    <AccordionPrimitive.Root ref={ref} {...props}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  )
})
Accordion.displayName = 'Accordion'

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>
>(({ ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('border-b border-border')} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium text-primary transition-all',
        'rounded-sm hover:text-link', focusRingInset,
        '[&[data-state=open]>svg]:rotate-180',
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-secondary transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>
>(({ children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm text-primary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0')}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
