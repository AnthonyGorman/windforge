import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function AvatarPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Avatar"
      description="A small visual stand-in for a person or entity. It shows an image when one loads and falls back to initials when it doesn't, so always provide a fallback."
    >
      <Section title="Image" subtitle="Pass a source and an alt. The fallback shows while the image loads or if it fails.">
        <Example
          live
          code={`<Avatar>
  <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Ada Lovelace" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`}
        />
      </Section>

      <PageDivider />

      <Section title="Fallback initials" subtitle="When no image is available, initials on a quiet surface keep the layout intact.">
        <Example
          live
          code={`<Avatar>
  <AvatarFallback>WF</AvatarFallback>
</Avatar>`}
        />
      </Section>

      <PageDivider />

      <Section title="Sizes" subtitle="A closed size scale (sm·md·lg·xl); the fallback text scales with the box automatically.">
        <Example
          live
          code={`<Stack direction="row" gap="md" align="center">
  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
  <Avatar size="md"><AvatarFallback>MD</AvatarFallback></Avatar>
  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
  <Avatar size="xl"><AvatarFallback>XL</AvatarFallback></Avatar>
</Stack>`}
        />
      </Section>

      <PageDivider />

      <Section title="Stacked group" subtitle="Overlap avatars to represent a team or a thread of collaborators in one compact unit.">
        <Example
          live
          code={`<Box className="flex -space-x-2">
  <Box className="ring-2 ring-surface rounded-full">
    <Avatar><AvatarImage src="https://i.pravatar.cc/80?img=1" alt="Member 1" /><AvatarFallback>A</AvatarFallback></Avatar>
  </Box>
  <Box className="ring-2 ring-surface rounded-full">
    <Avatar><AvatarImage src="https://i.pravatar.cc/80?img=2" alt="Member 2" /><AvatarFallback>B</AvatarFallback></Avatar>
  </Box>
  <Box className="ring-2 ring-surface rounded-full">
    <Avatar><AvatarImage src="https://i.pravatar.cc/80?img=3" alt="Member 3" /><AvatarFallback>C</AvatarFallback></Avatar>
  </Box>
  <Box className="ring-2 ring-surface rounded-full">
    <Avatar><AvatarFallback>+5</AvatarFallback></Avatar>
  </Box>
</Box>`}
        />
      </Section>
    </PageLayout>
  )
}
