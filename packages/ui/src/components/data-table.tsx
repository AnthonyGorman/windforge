import * as React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '../lib/utils'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from './table'
import { Checkbox } from './checkbox'
import { Pagination } from './pagination'

/**
 * DataTable — the batteries-included table: column sorting, row selection, and
 * optional client-side pagination, built on the Table primitives so it stays
 * on-system. Pass `columns` + `data` + a `rowKey`; opt into `selectable` and
 * `pageSize`. For a purely presentational table, use Table directly.
 *
 *   <DataTable rowKey={(r) => r.id} selectable pageSize={10}
 *     columns={[
 *       { header: 'Name', accessor: 'name', sortable: true },
 *       { header: 'Amount', accessor: 'amount', align: 'right', sortable: true },
 *     ]}
 *     data={rows}
 *   />
 */
type Align = 'left' | 'center' | 'right'

export interface DataTableColumn<Row> {
  header: React.ReactNode
  /** A row key, or a render function returning the cell content. */
  accessor: keyof Row | ((row: Row) => React.ReactNode)
  align?: Align
  sortable?: boolean
  /** Sort value when `accessor` is a render function (or to sort by something else). */
  sortAccessor?: (row: Row) => string | number
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[]
  data: readonly Row[]
  /** Stable id per row — required for selection and React keys. */
  rowKey: (row: Row) => string
  caption?: React.ReactNode
  selectable?: boolean
  /** Controlled selection (ids). Omit for uncontrolled. */
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
  /** Enable client-side pagination at this page size. */
  pageSize?: number
  /** Empty-state content when there are no rows. */
  emptyState?: React.ReactNode
}

type SortState = { index: number; dir: 'asc' | 'desc' } | null

function sortValue<Row>(col: DataTableColumn<Row>, row: Row): string | number {
  if (col.sortAccessor) return col.sortAccessor(row)
  if (typeof col.accessor !== 'function') {
    const v = row[col.accessor]
    return typeof v === 'number' ? v : String(v ?? '')
  }
  return ''
}

export function DataTable<Row>({
  columns, data, rowKey, caption, selectable, selected, onSelectedChange, pageSize, emptyState,
}: DataTableProps<Row>) {
  const [sort, setSort] = React.useState<SortState>(null)
  const [page, setPage] = React.useState(1)
  const [internalSel, setInternalSel] = React.useState<string[]>([])
  const sel = selected ?? internalSel
  const setSel = (ids: string[]) => {
    onSelectedChange?.(ids)
    if (selected === undefined) setInternalSel(ids)
  }

  const sorted = React.useMemo(() => {
    if (!sort) return [...data]
    const col = columns[sort.index]
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...data].sort((a, b) => {
      const av = sortValue(col, a)
      const bv = sortValue(col, b)
      if (av < bv) return -1 * dir
      if (av > bv) return 1 * dir
      return 0
    })
  }, [data, sort, columns])

  const pageCount = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1
  const current = Math.min(page, pageCount)
  const rows = pageSize ? sorted.slice((current - 1) * pageSize, current * pageSize) : sorted

  const pageIds = rows.map(rowKey)
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => sel.includes(id))
  const toggleAll = () =>
    setSel(allOnPageSelected ? sel.filter((id) => !pageIds.includes(id)) : [...new Set([...sel, ...pageIds])])
  const toggleRow = (id: string) =>
    setSel(sel.includes(id) ? sel.filter((x) => x !== id) : [...sel, id])

  const toggleSort = (index: number) =>
    setSort((s) =>
      s?.index !== index ? { index, dir: 'asc' } : s.dir === 'asc' ? { index, dir: 'desc' } : null,
    )

  const colCount = columns.length + (selectable ? 1 : 0)

  return (
    <div className="flex flex-col gap-3">
      <Table caption={caption}>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead align="center">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows on this page"
                />
              </TableHead>
            )}
            {columns.map((col, i) => {
              const active = sort?.index === i
              const SortIcon = !active ? ChevronsUpDown : sort!.dir === 'asc' ? ChevronUp : ChevronDown
              return (
                <TableHead key={i} align={col.align}>
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(i)}
                      aria-label={`Sort by ${typeof col.header === 'string' ? col.header : 'column'}`}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-sm transition-colors hover:text-primary',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        active ? 'text-primary' : 'text-tertiary',
                      )}
                    >
                      {col.header}
                      <SortIcon className="size-3.5 shrink-0" aria-hidden="true" />
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell align="center" colSpan={colCount}>
                <div className="py-6 text-sm text-secondary">{emptyState ?? 'No results.'}</div>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const id = rowKey(row)
              const isSelected = sel.includes(id)
              return (
                <TableRow key={id} data-state={isSelected ? 'selected' : undefined}>
                  {selectable && (
                    <TableCell align="center">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleRow(id)}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}
                  {columns.map((col, c) => (
                    <TableCell key={c} align={col.align}>
                      {typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {pageSize && pageCount > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-secondary">
            {selectable && sel.length > 0 ? `${sel.length} selected · ` : ''}
            {sorted.length} {sorted.length === 1 ? 'row' : 'rows'}
          </span>
          <Pagination page={current} count={pageCount} onPageChange={setPage} />
        </div>
      )}
    </div>
  )
}
