import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRing } from '../lib/recipes'

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>
>(({ ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors',
      focusRing,
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Selected state matches every other control (neutral inverse fill), not a hue.
      'data-[state=checked]:bg-surface-inverse data-[state=unchecked]:bg-surface-track',
    )}
    {...props}
  >
    {/* Knob is white on the translucent OFF track (stays visible in dark mode); on
        the inverse ON track it flips to the contrasting tone so it reads in both modes. */}
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform',
        'data-[state=checked]:bg-inverse',
        'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName
