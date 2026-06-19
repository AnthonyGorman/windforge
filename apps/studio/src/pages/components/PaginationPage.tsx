import { useState } from 'react'
import { Pagination, Stack, Text } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function PaginationPage() {
  const [page, setPage] = useState(1)
  const [page2, setPage2] = useState(6)

  return (
    <PageLayout
      eyebrow="Components"
      title="Pagination"
      description="Controlled page navigation. page is 1-based; count is the total. Shows a sibling window around the current page with ellipses, plus prev/next."
    >
      <Section title="Usage" subtitle="Controlled via page + onPageChange.">
        <Example code={`const [page, setPage] = useState(1)
<Stack gap="sm">
  <Pagination page={page} count={5} onPageChange={setPage} />
  <Text size="sm" tone="muted">Page {page} of 5</Text>
</Stack>`}>
          <Stack gap="sm">
            <Pagination page={page} count={5} onPageChange={setPage} />
            <Text size="sm" tone="muted">Page {page} of 5</Text>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Many pages" subtitle="Ellipses collapse the middle; siblingCount widens the window.">
        <Example code={`<Pagination page={page} count={20} onPageChange={setPage} />`}>
          <Pagination page={page2} count={20} onPageChange={setPage2} />
        </Example>
      </Section>
    </PageLayout>
  )
}
