import { useState } from 'react'
import { DatePicker, Calendar, FormField, Box } from '@windforge/ui'
import type { DateRange } from 'react-day-picker'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

export function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>()
  const [fieldDate, setFieldDate] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  return (
    <PageLayout
      eyebrow="Components"
      title="Date picker"
      description="A single-date field that opens the Calendar in a Popover, plus the Calendar itself for inline and range selection. The calendar (react-day-picker) is styled entirely from tokens — no vendor CSS — so it re-skins with the brand and color mode."
    >
      <Section title="DatePicker" subtitle="A controlled single-date field.">
        <Example
          code={`const [date, setDate] = useState<Date>()

<DatePicker value={date} onValueChange={setDate} />`}
        >
          <Box className="w-full max-w-xs">
            <DatePicker value={date} onValueChange={setDate} />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="In a FormField" subtitle="Composes like any other control.">
        <Example
          code={`<FormField label="Start date" description="When the trial begins." required>
  <DatePicker value={date} onValueChange={setDate} />
</FormField>`}
        >
          <Box className="w-full max-w-xs">
            <FormField label="Start date" description="When the trial begins." required>
              <DatePicker value={fieldDate} onValueChange={setFieldDate} />
            </FormField>
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Inline range" subtitle="Use the Calendar directly for range or multiple selection.">
        <Example
          code={`const [range, setRange] = useState<DateRange>()

<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />`}
        >
          <Box border="default" borderRadius="xl" className="w-fit">
            <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
