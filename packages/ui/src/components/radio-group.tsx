import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRing } from '../lib/recipes'

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>
>(({ ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-2.5')} {...props} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  NoStyle<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>
>(({ ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      'aspect-square h-5 w-5 rounded-full border border-strong text-primary transition-colors',
      focusRing,
      'disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-strong',
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName
