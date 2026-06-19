import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { Text } from './text'

/**
 * Breadcrumb — the path to the current page. Pass an `items` array; the last
 * item renders as the (non-link) current page, the rest as links. `label` is a
 * ReactNode, so a crumb can carry an icon. Override `separator` to change the
 * glyph between crumbs.
 *
 *   <Breadcrumb items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Projects', href: '/projects' },
 *     { label: 'Windforge' },
 *   ]} />
 */
export interface BreadcrumbItemData {
  label: React.ReactNode
  /** Link target. Omit on the final crumb (the current page). */
  href?: string
}

export interface BreadcrumbProps extends NoStyle<React.ComponentPropsWithoutRef<'nav'>> {
  items: BreadcrumbItemData[]
  /** Separator between crumbs; defaults to a chevron. */
  separator?: React.ReactNode
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" {...props}>
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm text-secondary')}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <li className={cn('inline-flex items-center gap-1.5')}>
                {isLast || item.href == null ? (
                  <Text span size="sm" weight="medium" role="link" aria-disabled="true" aria-current="page">
                    {item.label}
                  </Text>
                ) : (
                  <a href={item.href} className={cn('transition-colors hover:text-link cursor-pointer')}>
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li role="presentation" aria-hidden="true" className={cn('[&_svg]:size-3.5 text-tertiary')}>
                  {separator ?? <ChevronRight />}
                </li>
              )}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  ),
)
Breadcrumb.displayName = 'Breadcrumb'
