import { CodeBlock, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const SAMPLE = `import { Button } from '@windforge/ui'

export function Save() {
  return <Button onClick={() => save()}>Save changes</Button>
}`

export function CodeBlockPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="CodeBlock"
      description="The on-system, syntax-highlighted code surface — one source of truth for every snippet (the studio's own examples render through it). Highlighting runs locally via prism-react-renderer; no network, no API. The theme is built from --wf-* tokens, so the code re-skins with light/dark and with a brand swap automatically."
    >
      <Section title="Usage" subtitle="Pass a code string and a language. Keywords ride the brand; strings/numbers/props use the status ramp.">
        <Example
          code={`<CodeBlock language="tsx" code={source} />`}
        >
          <Box className="w-full"><CodeBlock language="tsx" code={SAMPLE} /></Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Filename + line numbers" subtitle="A header shows the filename and language; the gutter numbers lines.">
        <Example
          code={`<CodeBlock filename="save.tsx" language="tsx" showLineNumbers code={source} />`}
        >
          <Box className="w-full"><CodeBlock filename="save.tsx" language="tsx" showLineNumbers code={SAMPLE} /></Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Highlighted lines" subtitle="Emphasize specific 1-based lines with a brand-subtle wash.">
        <Example
          code={`<CodeBlock showLineNumbers highlightLines={[4]} code={source} />`}
        >
          <Box className="w-full"><CodeBlock showLineNumbers highlightLines={[4]} code={SAMPLE} /></Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Other languages" subtitle="Any prism language id — here a shell snippet, no copy button.">
        <Example
          code={`<CodeBlock language="bash" copyable={false} code="npm run generate" />`}
        >
          <Box className="w-full">
            <CodeBlock language="bash" copyable={false} code={`npm install\nnpm run generate   # compile tokens\nnpm run dev        # studio on :5174`} />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
