import React from 'react'
import { Box, H1, H2, Text, Separator } from '@windforge/ui'

export function PageLayout({
  title, description, eyebrow, children,
}: { title: string; description?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <header>
      <Box maxWidth="md" className="mx-auto pb-24">
        <Box className="mb-8">
          {eyebrow && (
            <Box className="mb-2 uppercase tracking-wider">
              <Text size="sm" weight="semibold" tone="brand">{eyebrow}</Text>
            </Box>
          )}
          <H1>{title}</H1>
          {description && (
            <Box className="mt-3 leading-relaxed">
              <Text>{description}</Text>
            </Box>
          )}
        </Box>
        {children}
      </Box>
    </header>
  )
}

export function Section({
  title, subtitle, children,
}: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <Box className="mb-10">
        <H2 size="xl">{title}</H2>
        <Box className="mb-4 mt-1.5 leading-relaxed">
          <Text size="sm">{subtitle ?? ' '}</Text>
        </Box>
        {children}
      </Box>
    </section>
  )
}

export function PageDivider() {
  return <Box className="my-10"><Separator /></Box>
}
