import { useState } from 'react'
import { DataTable, Badge, type DataTableColumn } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

interface Invoice {
  id: string
  customer: string
  status: 'paid' | 'pending' | 'failed'
  amount: number
}

const rows: Invoice[] = [
  { id: 'INV-001', customer: 'Acme Corp', status: 'paid', amount: 1200 },
  { id: 'INV-002', customer: 'Globex', status: 'pending', amount: 640 },
  { id: 'INV-003', customer: 'Initech', status: 'paid', amount: 980 },
  { id: 'INV-004', customer: 'Umbrella', status: 'failed', amount: 320 },
  { id: 'INV-005', customer: 'Soylent', status: 'paid', amount: 2100 },
  { id: 'INV-006', customer: 'Hooli', status: 'pending', amount: 450 },
  { id: 'INV-007', customer: 'Stark Industries', status: 'paid', amount: 5400 },
]

const STATUS = { paid: 'success', pending: 'warning', failed: 'error' } as const
const money = (n: number) => `$${n.toLocaleString()}`

const columns: DataTableColumn<Invoice>[] = [
  { header: 'Invoice', accessor: 'id', sortable: true },
  { header: 'Customer', accessor: 'customer', sortable: true },
  {
    header: 'Status',
    accessor: (r) => <Badge variant={STATUS[r.status]}>{r.status}</Badge>,
    sortAccessor: (r) => r.status,
    sortable: true,
  },
  { header: 'Amount', accessor: (r) => money(r.amount), sortAccessor: (r) => r.amount, align: 'right', sortable: true },
]

export function DataTablePage() {
  const [selected, setSelected] = useState<string[]>([])
  return (
    <PageLayout
      eyebrow="Components"
      title="DataTable"
      description="The batteries-included table — column sorting, row selection, and optional client-side pagination — built on the Table primitives so it stays on-system. For a purely presentational table, use Table directly."
    >
      <Section title="Sortable + selectable" subtitle="Click a header to sort; tick rows to select. Selection is controlled here.">
        <Example
          code={`const columns = [
  { header: 'Invoice', accessor: 'id', sortable: true },
  { header: 'Customer', accessor: 'customer', sortable: true },
  { header: 'Status', sortable: true, sortAccessor: (r) => r.status,
    accessor: (r) => <Badge variant={STATUS[r.status]}>{r.status}</Badge> },
  { header: 'Amount', align: 'right', sortable: true,
    sortAccessor: (r) => r.amount, accessor: (r) => money(r.amount) },
]

<DataTable rowKey={(r) => r.id} columns={columns} data={rows}
  selectable pageSize={5}
  selected={selected} onSelectedChange={setSelected} />`}
        >
          <DataTable
            rowKey={(r) => r.id}
            columns={columns}
            data={rows}
            selectable
            pageSize={5}
            selected={selected}
            onSelectedChange={setSelected}
          />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Plain" subtitle="Drop selection and pagination for a simple sortable table.">
        <Example
          code={`<DataTable rowKey={(r) => r.id} columns={columns} data={rows} />`}
        >
          <DataTable rowKey={(r) => r.id} columns={columns} data={rows.slice(0, 4)} />
        </Example>
      </Section>
    </PageLayout>
  )
}
