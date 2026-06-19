import * as React from 'react'
import * as echarts from 'echarts/core'
import type { EChartsCoreOption } from 'echarts/core'
import { LineChart, BarChart, PieChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent, TooltipComponent, GridComponent, LegendComponent,
  DataZoomComponent, MarkLineComponent, MarkAreaComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  LineChart, BarChart, PieChart, ScatterChart,
  TitleComponent, TooltipComponent, GridComponent, LegendComponent,
  DataZoomComponent, MarkLineComponent, MarkAreaComponent,
  CanvasRenderer,
])

/**
 * Chart — a token-driven ECharts surface. Pass a standard ECharts `option`; the
 * series palette, axes, grid, tooltip, and fonts are themed from the live `--wf-*`
 * tokens, so charts re-skin with the brand and flip with light/dark automatically
 * (no ThemeProvider required — it watches the document root). Auto-resizes.
 *
 *   <Chart option={{ xAxis: { type: 'category', data: months },
 *                    yAxis: { type: 'value' },
 *                    series: [{ type: 'line', data: revenue }] }} />
 *
 * ECharts is the one canvas dependency; everything else stays DOM + tokens.
 */
export interface ChartProps {
  /** A standard ECharts option object. */
  option: EChartsCoreOption
  /** Pixel or CSS height (width always fills the container). Default 320. */
  height?: number | string
  /** Replace the previous option wholesale instead of merging. Default true. */
  notMerge?: boolean
  /** ECharts events to bind, e.g. `{ click: (p) => … }`. */
  onEvents?: Record<string, (params: unknown) => void>
}

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

/** Build an ECharts theme object from the resolved Windforge tokens. */
function buildTheme(): object {
  const text = cssVar('--wf-color-text-primary')
  const muted = cssVar('--wf-color-text-secondary')
  const faint = cssVar('--wf-color-text-tertiary')
  const line = cssVar('--wf-color-border-default')
  const subtle = cssVar('--wf-color-border-subtle')
  const surface = cssVar('--wf-color-background-paper')
  const font = cssVar('--wf-font-sans')
  const palette = [
    cssVar('--wf-color-brand-primary'),
    cssVar('--wf-color-status-info-default'),
    cssVar('--wf-color-status-success-default'),
    cssVar('--wf-color-status-warning-default'),
    cssVar('--wf-color-status-error-default'),
    cssVar('--wf-color-brand-secondary'),
  ].filter(Boolean)

  const axis = {
    axisLine: { lineStyle: { color: line } },
    axisTick: { lineStyle: { color: line } },
    axisLabel: { color: muted },
    splitLine: { lineStyle: { color: subtle } },
  }
  return {
    color: palette,
    backgroundColor: 'transparent',
    textStyle: { color: text, fontFamily: font },
    title: { textStyle: { color: text }, subtextStyle: { color: faint } },
    legend: { textStyle: { color: muted } },
    tooltip: {
      backgroundColor: surface,
      borderColor: line,
      textStyle: { color: text, fontFamily: font },
      axisPointer: { lineStyle: { color: muted }, crossStyle: { color: muted } },
    },
    categoryAxis: axis,
    valueAxis: axis,
    logAxis: axis,
    timeAxis: axis,
    // Series labels (notably pie's outside labels) don't inherit the global
    // textStyle — pin them to the foreground token so they stay readable in both
    // modes, and tint the connector lines with the border token.
    pie: {
      label: { color: text, fontFamily: font },
      labelLine: { lineStyle: { color: line } },
    },
  }
}

export function Chart({ option, height = 320, notMerge = true, onEvents }: ChartProps) {
  const elRef = React.useRef<HTMLDivElement>(null)
  const chartRef = React.useRef<echarts.ECharts | null>(null)
  // Bump on any document-root attribute change (mode class / runtime token style),
  // so the chart re-inits with the new theme — provider-independent reactivity.
  const [themeKey, bump] = React.useReducer((x: number) => x + 1, 0)

  React.useEffect(() => {
    const mo = new MutationObserver(() => bump())
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })
    return () => mo.disconnect()
  }, [])

  // (Re)create the instance when the theme changes; ECharts bakes the theme at init.
  React.useEffect(() => {
    if (!elRef.current) return
    const chart = echarts.init(elRef.current, buildTheme())
    chartRef.current = chart
    chart.setOption(option, notMerge)
    if (onEvents) for (const [name, handler] of Object.entries(onEvents)) chart.on(name, handler)
    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(elRef.current)
    return () => {
      ro.disconnect()
      chart.dispose()
      chartRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeKey])

  // Push option updates to the existing instance (no re-init needed).
  React.useEffect(() => {
    chartRef.current?.setOption(option, notMerge)
  }, [option, notMerge])

  return <div ref={elRef} role="img" style={{ height, width: '100%' }} />
}
