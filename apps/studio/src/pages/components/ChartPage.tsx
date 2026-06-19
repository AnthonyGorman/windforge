import { Chart, Box } from '@windforge/ui'
import { PageLayout, Section, PageDivider } from '../../components/PageLayout'
import { Example } from '../../components/Example'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export function ChartPage() {
  return (
    <PageLayout
      eyebrow="Components"
      title="Chart"
      description="A token-driven ECharts surface. Pass a standard ECharts option; the series palette, axes, tooltip, and fonts are themed from the live --wf-* tokens, so charts re-skin with the brand and flip with light/dark automatically. The one canvas dependency in the system."
    >
      <Section title="Line" subtitle="Series colors come from the brand + status ramp; switch the theme or brand and the chart follows.">
        <Example
          code={`<Chart option={{
  tooltip: { trigger: 'axis' },
  grid: { left: 36, right: 12, top: 16, bottom: 24 },
  xAxis: { type: 'category', data: ['Jan','Feb','Mar','Apr','May','Jun'] },
  yAxis: { type: 'value' },
  series: [
    { name: 'Revenue', type: 'line', smooth: true, data: [820, 932, 901, 1290, 1330, 1620] },
    { name: 'Costs', type: 'line', smooth: true, data: [620, 532, 701, 790, 830, 920] },
  ],
}} />`}
        >
          <Box className="w-full">
            <Chart
              option={{
                tooltip: { trigger: 'axis' },
                legend: {},
                grid: { left: 36, right: 12, top: 32, bottom: 24 },
                xAxis: { type: 'category', data: months },
                yAxis: { type: 'value' },
                series: [
                  { name: 'Revenue', type: 'line', smooth: true, data: [820, 932, 901, 1290, 1330, 1620] },
                  { name: 'Costs', type: 'line', smooth: true, data: [620, 532, 701, 790, 830, 920] },
                ],
              }}
            />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Bar" subtitle="The same theming applies to every chart type.">
        <Example
          code={`<Chart option={{
  tooltip: {},
  grid: { left: 36, right: 12, top: 16, bottom: 24 },
  xAxis: { type: 'category', data: ['Jan','Feb','Mar','Apr','May','Jun'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [120, 200, 150, 80, 170, 210] }],
}} />`}
        >
          <Box className="w-full">
            <Chart
              option={{
                tooltip: {},
                grid: { left: 36, right: 12, top: 16, bottom: 24 },
                xAxis: { type: 'category', data: months },
                yAxis: { type: 'value' },
                series: [{ type: 'bar', data: [120, 200, 150, 80, 170, 210] }],
              }}
            />
          </Box>
        </Example>
      </Section>

      <PageDivider />

      <Section title="Pie" subtitle="Donut, gauge, scatter — anything ECharts renders, themed to the system.">
        <Example
          code={`<Chart height={280} option={{
  tooltip: { trigger: 'item' },
  legend: { bottom: 0 },
  series: [{
    type: 'pie', radius: ['45%', '70%'],
    data: [
      { value: 1048, name: 'Direct' },
      { value: 735, name: 'Search' },
      { value: 580, name: 'Referral' },
      { value: 300, name: 'Social' },
    ],
  }],
}} />`}
        >
          <Box className="w-full">
            <Chart
              height={280}
              option={{
                tooltip: { trigger: 'item' },
                legend: { bottom: 0 },
                series: [
                  {
                    type: 'pie',
                    radius: ['45%', '70%'],
                    data: [
                      { value: 1048, name: 'Direct' },
                      { value: 735, name: 'Search' },
                      { value: 580, name: 'Referral' },
                      { value: 300, name: 'Social' },
                    ],
                  },
                ],
              }}
            />
          </Box>
        </Example>
      </Section>
    </PageLayout>
  )
}
