import * as React from 'react'

export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  /** SVG viewBox — defaults to the 24×24 grid lucide draws on, so custom icons
   *  line up with the rest of the set. */
  viewBox?: string
  /** Accessible label. Omit for a purely decorative icon (rendered aria-hidden). */
  label?: string
}

/**
 * SVGIcon — render a custom icon with the same conventions as the supported
 * lucide set: a 24×24 viewBox, 2px round strokes painted in `currentColor`, and
 * sizing through h-/w- utilities. Pass the shape as children; override `stroke`,
 * `fill`, or `strokeWidth` for a filled or heavier glyph.
 *
 *   <SVGIcon label="Spark" className="h-5 w-5 text-brand">
 *     <path d="M12 2 4 7v10l8 5 8-5V7z" />
 *   </SVGIcon>
 */
export const SVGIcon = React.forwardRef<SVGSVGElement, SVGIconProps>(
  ({ viewBox = '0 0 24 24', label, children, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  ),
)
SVGIcon.displayName = 'SVGIcon'
