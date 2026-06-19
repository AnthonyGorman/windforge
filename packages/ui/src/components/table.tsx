import * as React from 'react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' } as const
type Align = keyof typeof alignClass

/**
 * Table — pass `columns` + `data` for the common case (the component renders the
 * header, rows, and cells), or compose `TableHeader`/`TableRow`/`TableCell` by
 * hand for full control. Each column's `accessor` is a row key or a render
 * function for custom cells (badges, buttons, …).
 *
 *   <Table
 *     columns={[
 *       { header: 'Name', accessor: 'name' },
 *       { header: 'Status', accessor: (r) => <Badge>{r.status}</Badge> },
 *       { header: 'Amount', accessor: 'amount', align: 'right' },
 *     ]}
 *     data={rows}
 *   />
 */
export interface TableColumn<Row = Record<string, React.ReactNode>> {
  header: React.ReactNode
  /** A key into the row, or a render function returning the cell content. */
  accessor: keyof Row | ((row: Row) => React.ReactNode)
  align?: Align
}

export interface TableProps<Row = Record<string, React.ReactNode>>
  extends NoStyle<React.HTMLAttributes<HTMLTableElement>> {
  columns?: TableColumn<Row>[]
  data?: readonly Row[]
  caption?: React.ReactNode
}

// Generic forwardRef so `data` infers the row type — column accessors stay typed.
function TableInner<Row extends Record<string, React.ReactNode>>(
  { columns, data, caption, children, ...props }: TableProps<Row>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  return (
    <div className="relative w-full overflow-auto rounded-xl border border-border">
      <table ref={ref} className={cn('w-full caption-bottom text-sm')} {...props}>
        {caption != null && <TableCaption>{caption}</TableCaption>}
        {columns && data ? (
          <>
            <TableHeader>
              <TableRow>
                {columns.map((col, i) => (
                  <TableHead key={i} align={col.align}>{col.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, r) => (
                <TableRow key={r}>
                  {columns.map((col, c) => (
                    <TableCell key={c} align={col.align}>
                      {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </>
        ) : (
          children
        )}
      </table>
    </div>
  )
}

export const Table = React.forwardRef(TableInner) as (<Row extends Record<string, React.ReactNode>>(
  props: TableProps<Row> & { ref?: React.ForwardedRef<HTMLTableElement> },
) => React.ReactElement) & { displayName?: string }
Table.displayName = 'Table'

export const TableHeader = React.forwardRef<HTMLTableSectionElement, NoStyle<React.HTMLAttributes<HTMLTableSectionElement>>>(
  ({ ...props }, ref) => <thead ref={ref} className={cn('[&_tr]:border-b [&_tr]:border-border')} {...props} />,
)
TableHeader.displayName = 'TableHeader'

export const TableBody = React.forwardRef<HTMLTableSectionElement, NoStyle<React.HTMLAttributes<HTMLTableSectionElement>>>(
  ({ ...props }, ref) => <tbody ref={ref} className={cn('[&_tr:last-child]:border-0')} {...props} />,
)
TableBody.displayName = 'TableBody'

export const TableFooter = React.forwardRef<HTMLTableSectionElement, NoStyle<React.HTMLAttributes<HTMLTableSectionElement>>>(
  ({ ...props }, ref) => <tfoot ref={ref} className={cn('border-t border-border bg-surface-subtle font-medium')} {...props} />,
)
TableFooter.displayName = 'TableFooter'

export const TableRow = React.forwardRef<HTMLTableRowElement, NoStyle<React.HTMLAttributes<HTMLTableRowElement>>>(
  ({ ...props }, ref) => (
    <tr ref={ref} className={cn('border-b border-border transition-colors hover:bg-surface-subtle data-[state=selected]:bg-surface-inset')} {...props} />
  ),
)
TableRow.displayName = 'TableRow'

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  Omit<NoStyle<React.ThHTMLAttributes<HTMLTableCellElement>>, 'align'> & { align?: Align }
>(({ align = 'left', ...props }, ref) => (
  <th ref={ref} className={cn('h-11 px-4 align-middle text-sm font-semibold uppercase tracking-wide text-tertiary', alignClass[align])} {...props} />
))
TableHead.displayName = 'TableHead'

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  Omit<NoStyle<React.TdHTMLAttributes<HTMLTableCellElement>>, 'align'> & { align?: Align }
>(({ align = 'left', ...props }, ref) => (
  <td ref={ref} className={cn('px-4 py-3 align-middle', alignClass[align])} {...props} />
))
TableCell.displayName = 'TableCell'

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, NoStyle<React.HTMLAttributes<HTMLTableCaptionElement>>>(
  ({ ...props }, ref) => <caption ref={ref} className={cn('mt-4 text-sm text-secondary')} {...props} />,
)
TableCaption.displayName = 'TableCaption'
