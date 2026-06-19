import { Skeleton, Stack, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function SkeletonPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Skeleton"
      description="A shimmering placeholder that holds the shape of content while it loads. Compose primitive blocks to mirror the real layout so the page doesn't jump when data arrives."
    >
      <Section title="Lines" subtitle="A stack of bars standing in for text.">
        <Example
          code={`<Stack gap="sm" className="w-72">
  <Box className="h-4 w-full"><Skeleton /></Box>
  <Box className="h-4 w-5/6"><Skeleton /></Box>
  <Box className="h-4 w-2/3"><Skeleton /></Box>
</Stack>`}
        >
          <Stack gap="sm" className="w-72">
            <Box className="h-4 w-full"><Skeleton /></Box>
            <Box className="h-4 w-5/6"><Skeleton /></Box>
            <Box className="h-4 w-2/3"><Skeleton /></Box>
          </Stack>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Card" subtitle="Mirror a media object: a circular avatar beside a title and a subtitle.">
        <Example
          code={`<Box padding="md" background="surface" borderRadius="xl" border="default" className="w-80">
  <Stack direction="row" align="center" gap="md">
    <Box className="h-12 w-12 rounded-full overflow-hidden"><Skeleton /></Box>
    <Stack gap="sm" className="flex-1">
      <Box className="h-4 w-3/4"><Skeleton /></Box>
      <Box className="h-3 w-1/2"><Skeleton /></Box>
    </Stack>
  </Stack>
</Box>`}
        >
          <Box padding="md" background="surface" borderRadius="xl" border="default" className="w-80">
            <Stack direction="row" align="center" gap="md">
              <Box className="h-12 w-12 rounded-full overflow-hidden"><Skeleton /></Box>
              <Stack gap="sm" className="flex-1">
                <Box className="h-4 w-3/4"><Skeleton /></Box>
                <Box className="h-3 w-1/2"><Skeleton /></Box>
              </Stack>
            </Stack>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Table row" subtitle="Reserve the grid of a data table so columns hold their place during load.">
        <Example
          code={`<Box padding="md" background="surface" borderRadius="xl" border="default" className="w-full">
  <Stack gap="md">
    {[0, 1, 2].map((i) => (
      <Stack key={i} direction="row" align="center" gap="md">
        <Box className="h-8 w-8 rounded-full overflow-hidden"><Skeleton /></Box>
        <Box className="h-4 flex-1"><Skeleton /></Box>
        <Box className="h-4 w-24"><Skeleton /></Box>
        <Box className="h-4 w-16"><Skeleton /></Box>
      </Stack>
    ))}
  </Stack>
</Box>`}
        >
          <Box padding="md" background="surface" borderRadius="xl" border="default" className="w-full">
            <Stack gap="md">
              {[0, 1, 2].map((i) => (
                <Stack key={i} direction="row" align="center" gap="md">
                  <Box className="h-8 w-8 rounded-full overflow-hidden"><Skeleton /></Box>
                  <Box className="h-4 flex-1"><Skeleton /></Box>
                  <Box className="h-4 w-24"><Skeleton /></Box>
                  <Box className="h-4 w-16"><Skeleton /></Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
