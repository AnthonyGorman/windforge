import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRing } from '../lib/recipes'

/**
 * Tabs — pass an `items` array for the common case (the component renders the
 * list, triggers, and panels for you), or compose `TabsList`/`TabsTrigger`/
 * `TabsContent` by hand for full control.
 *
 *   <Tabs defaultValue="overview" items={[
 *     { value: 'overview', label: 'Overview', content: <Overview /> },
 *     { value: 'usage', label: 'Usage', content: <Usage /> },
 *   ]} />
 */
export interface TabItem {
  value: string
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps extends NoStyle<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>> {
  /** Declarative tabs. Omit to compose the primitives as children instead. */
  items?: TabItem[]
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ items, children, ...props }, ref) => {
  if (!items) return <TabsPrimitive.Root ref={ref} {...props}>{children}</TabsPrimitive.Root>
  return (
    <TabsPrimitive.Root ref={ref} {...props}>
      <TabsList>
        {items.map((t) => (
          <TabsTrigger key={t.value} value={t.value} disabled={t.disabled}>{t.label}</TabsTrigger>
        ))}
      </TabsList>
      {items.map((t) => (
        <TabsContent key={t.value} value={t.value}>{t.content}</TabsContent>
      ))}
    </TabsPrimitive.Root>
  )
})
Tabs.displayName = 'Tabs'

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  NoStyle<React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>
>(({ ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-surface-inset p-1 text-secondary',
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  NoStyle<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>
>(({ ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
      focusRing,
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=active]:bg-surface data-[state=active]:text-primary data-[state=active]:shadow-sm',
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  NoStyle<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>
>(({ ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-lg focus-visible:outline-none')}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName
