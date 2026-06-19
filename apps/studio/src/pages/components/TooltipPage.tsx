import {
  Button,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@windforge/ui'
import { Bell, Info } from 'lucide-react'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function TooltipPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Tooltip"
      description="A small label that appears on hover or focus to explain an element. Every tooltip lives inside a TooltipProvider, which coordinates timing across the group."
    >
      <Section title="Basic" subtitle="Wrap a trigger and its content in a Tooltip; the provider handles open delay and dismissal.">
        <Example
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Builds the project from scratch</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Builds the project from scratch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Icon button" subtitle="Tooltips give icon-only controls an accessible, discoverable label.">
        <Example
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="tertiary" size="icon">
        <Bell />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Notifications</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="tertiary" size="icon">
                  <Bell />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Placement" subtitle="Set the side prop when the default position would clip or crowd the trigger.">
        <Example
          code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary" size="icon"><Info /></Button>
    </TooltipTrigger>
    <TooltipContent side="top">Top</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary" size="icon"><Info /></Button>
    </TooltipTrigger>
    <TooltipContent side="right">Right</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary" size="icon"><Info /></Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">Bottom</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="secondary" size="icon"><Info /></Button>
    </TooltipTrigger>
    <TooltipContent side="left">Left</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon"><Info /></Button>
              </TooltipTrigger>
              <TooltipContent side="top">Top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon"><Info /></Button>
              </TooltipTrigger>
              <TooltipContent side="right">Right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon"><Info /></Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Bottom</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon"><Info /></Button>
              </TooltipTrigger>
              <TooltipContent side="left">Left</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Example>
      </Section>
    </PageLayout>
  )
}
