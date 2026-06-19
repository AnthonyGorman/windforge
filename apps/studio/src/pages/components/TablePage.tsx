import {
  Table, TableHeader, TableBody, TableFooter, TableRow,
  TableHead, TableCell, TableCaption, Badge, Text,
} from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const invoices = [
  { id: 'INV-001', status: 'Paid', variant: 'success', method: 'Visa •••• 4242', amount: '$250.00' },
  { id: 'INV-002', status: 'Pending', variant: 'warning', method: 'PayPal', amount: '$150.00' },
  { id: 'INV-003', status: 'Overdue', variant: 'error', method: 'Mastercard •••• 1881', amount: '$420.00' },
  { id: 'INV-004', status: 'Paid', variant: 'success', method: 'Visa •••• 4242', amount: '$90.00' },
  { id: 'INV-005', status: 'Paid', variant: 'success', method: 'ACH transfer', amount: '$610.00' },
] as const

export function TablePage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Table"
      description="A semantic data table. Pass columns + data for the common case — each column's accessor is a row key or a render function for custom cells like status badges and aligned numbers."
    >
      <Section title="Invoices" subtitle="A status badge per row and right-aligned amounts, driven by a columns array.">
        <Example
          code={`<Table
  caption="A list of your recent invoices."
  columns={[
    { header: 'Invoice', accessor: (r) => <Text span weight="medium">{r.id}</Text> },
    { header: 'Status', accessor: (r) => <Badge variant={r.variant}>{r.status}</Badge> },
    { header: 'Method', accessor: (r) => <Text span tone="muted">{r.method}</Text> },
    { header: 'Amount', accessor: 'amount', align: 'right' },
  ]}
  data={invoices}
/>`}
        >
          <Table
            caption="A list of your recent invoices."
            columns={[
              { header: 'Invoice', accessor: (r) => <Text span weight="medium">{r.id}</Text> },
              { header: 'Status', accessor: (r) => <Badge variant={r.variant}>{r.status}</Badge> },
              { header: 'Method', accessor: (r) => <Text span tone="muted">{r.method}</Text> },
              { header: 'Amount', accessor: 'amount', align: 'right' },
            ]}
            data={invoices}
          />
        </Example>
      </Section>

      <PageDivider />

      <Section title="Composition" subtitle="For totals, spanning cells, or bespoke layouts, compose the primitives directly — the escape hatch.">
        <Example
          code={`<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead align="right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-001</TableCell>
      <TableCell align="right">$250.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell align="right">$1,520.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
        >
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead align="right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell align="right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">$1,520.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Example>
      </Section>
    </PageLayout>
  )
}
