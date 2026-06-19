import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * Avatar — a circular image or initials fallback. `size` is a closed scale
 * (sm·md·lg·xl); the fallback's text scales with it automatically.
 */
const avatar = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    },
  },
  defaultVariants: { size: 'md' },
})

type AvatarSize = NonNullable<VariantProps<typeof avatar>['size']>
const FALLBACK_TEXT: Record<AvatarSize, string> = {
  sm: 'text-sm', md: 'text-sm', lg: 'text-base', xl: 'text-lg',
}
const AvatarSizeContext = React.createContext<AvatarSize>('md')

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>> & VariantProps<typeof avatar>
>(({ size, ...props }, ref) => (
  <AvatarSizeContext.Provider value={size ?? 'md'}>
    <AvatarPrimitive.Root ref={ref} className={cn(avatar({ size }))} {...props} />
  </AvatarSizeContext.Provider>
))
Avatar.displayName = AvatarPrimitive.Root.displayName

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>
>(({ ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full object-cover')} {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  NoStyle<React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>
>(({ ...props }, ref) => {
  const size = React.useContext(AvatarSizeContext)
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center rounded-full bg-surface-inset font-medium text-primary', FALLBACK_TEXT[size])}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
