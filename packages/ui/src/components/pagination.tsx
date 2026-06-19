import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'
import { focusRingInset } from '../lib/recipes'

/**
 * Pagination — controlled page navigation. `page` is 1-based; `count` is the
 * total number of pages. Renders first/last, a window of siblings around the
 * current page, and ellipses. Emits `onPageChange`.
 */
export interface PaginationProps extends NoStyle<Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>> {
  page: number
  count: number
  onPageChange: (page: number) => void
  siblingCount?: number
}

const DOTS = 'dots'

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function usePageItems(page: number, count: number, siblingCount: number): (number | typeof DOTS)[] {
  return React.useMemo(() => {
    const total = siblingCount * 2 + 5 // first, last, current, 2 dots
    if (count <= total) return range(1, count)
    const left = Math.max(page - siblingCount, 1)
    const right = Math.min(page + siblingCount, count)
    const showLeftDots = left > 2
    const showRightDots = right < count - 1
    if (!showLeftDots && showRightDots) return [...range(1, 3 + siblingCount * 2), DOTS, count]
    if (showLeftDots && !showRightDots) return [1, DOTS, ...range(count - (2 + siblingCount * 2), count)]
    return [1, DOTS, ...range(left, right), DOTS, count]
  }, [page, count, siblingCount])
}

const cell =
  'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ' +
  'disabled:opacity-40 disabled:pointer-events-none [&_svg]:size-4 ' + focusRingInset

export function Pagination({ page, count, onPageChange, siblingCount = 1, ...props }: PaginationProps) {
  const pageItems = usePageItems(page, count, siblingCount)
  const goToPage = (targetPage: number) => onPageChange(Math.min(count, Math.max(1, targetPage)))

  return (
    <nav role="navigation" aria-label="Pagination" className={cn('flex items-center gap-1')} {...props}>
      <button type="button" className={cn(cell, 'text-secondary hover:bg-surface-inset hover:text-primary')} onClick={() => goToPage(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeft />
      </button>
      {pageItems.map((pageItem, index) =>
        pageItem === DOTS ? (
          <span key={`dots-${index}`} className="inline-flex h-9 min-w-9 items-center justify-center text-tertiary">…</span>
        ) : (
          <button
            key={pageItem}
            type="button"
            aria-current={pageItem === page ? 'page' : undefined}
            onClick={() => goToPage(pageItem)}
            className={cn(cell, pageItem === page ? 'bg-surface-inverse text-inverse' : 'text-secondary hover:bg-surface-inset hover:text-primary')}
          >
            {pageItem}
          </button>
        ),
      )}
      <button type="button" className={cn(cell, 'text-secondary hover:bg-surface-inset hover:text-primary')} onClick={() => goToPage(page + 1)} disabled={page >= count} aria-label="Next page">
        <ChevronRight />
      </button>
    </nav>
  )
}
