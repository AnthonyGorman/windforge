/**
 * @windforge/ui — the single import surface.
 *
 * Re-exports every component, layout, the brand mark, the `cn` helper, and the
 * full @windforge/tokens surface (wf* constants, brandVars/brandRamp, source maps).
 * Consumers import from here and nowhere else.
 */

// ── catalog (machine-readable component registry) ──
export * from './catalog'

// ── utilities ──
export { cn } from './lib/utils'
export { useMediaQuery } from './lib/use-media-query'
export * from './lib/recipes'

// ── primitives ──
export * from './components/button'
export * from './components/button-group'
export * from './components/toggle-button'
export * from './components/badge'
export * from './components/chip'
export * from './components/text'
export * from './components/link'
export * from './components/card'
export * from './components/input'
export * from './components/textarea'
export * from './components/label'
export * from './components/form-field'
export * from './components/separator'
export * from './components/skeleton'
export * from './components/code-block'
export * from './components/alert'
export * from './components/layout'

// ── interactive (Radix-backed) ──
export * from './components/switch'
export * from './components/checkbox'
export * from './components/radio-group'
export * from './components/tabs'
export * from './components/tooltip'
export * from './components/select'
export * from './components/autocomplete'
export * from './components/modal'
export * from './components/dialog'
export * from './components/pagination'
export * from './components/stepper'
export * from './components/toast'
export * from './components/accordion'
export * from './components/avatar'
export * from './components/progress'
export * from './components/slider'
export * from './components/popover'
export * from './components/dropdown-menu'
export * from './components/table'
export * from './components/data-table'
export * from './components/breadcrumb'
export * from './components/sheet'
export * from './components/multi-select'
export * from './components/command'
export * from './components/calendar'
export * from './components/date-picker'
export * from './components/chart'

// ── brand & icons ──
// lucide-react is the supported icon library (imported directly by consumers).
// `commonIcons`/`commonIconGroups` are a reference selection for the docs gallery;
// `SVGIcon` wraps a custom SVG in the same conventions.
export * from './icons/forge-icon'
export * from './icons/svg-icon'
export { commonIcons, commonIconGroups } from './icons/icon-set'

// ── layouts ──
export * from './layouts/theme-provider'
export * from './layouts/app-shell'
export * from './layouts/side-nav'
export * from './layouts/app-bar'

// ── tokens (single token surface) ──
export * from '@windforge/tokens'
