import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRing } from '../lib/recipes'

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>
>(({ ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center')}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-surface-track">
      <SliderPrimitive.Range className="absolute h-full bg-surface-inverse" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        'block h-5 w-5 rounded-full border-2 border-strong bg-surface shadow-sm transition-colors',
        focusRing,
        'disabled:pointer-events-none disabled:opacity-50',
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName
