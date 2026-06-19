import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Menu, Sun, Moon, MonitorSmartphone } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from '../components/button'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/tooltip'
import { useTheme, type ColorMode } from './theme-provider'
import { useAppShell } from './app-shell'

// `variant` picks the surface treatment: `glass` is the translucent, blurred bar
// (content scrolls frostily behind it — the default); `solid` is a flat, opaque
// bar for a calmer, cleaner chrome. `color` overrides which surface token the bar
// sits on (e.g. `inset`) under either treatment. Class strings are spelled out in
// full so Tailwind's content scanner keeps them.
const appBarVariants = cva(
  'sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border px-4',
  {
    variants: {
      variant: { glass: 'backdrop-blur-md', solid: '' },
      color: { surface: '', subtle: '', inset: '' },
    },
    compoundVariants: [
      { variant: 'glass', color: 'surface', class: 'bg-surface/80' },
      { variant: 'glass', color: 'subtle',  class: 'bg-surface-subtle/80' },
      { variant: 'glass', color: 'inset',   class: 'bg-surface-inset/80' },
      { variant: 'solid', color: 'surface', class: 'bg-surface' },
      { variant: 'solid', color: 'subtle',  class: 'bg-surface-subtle' },
      { variant: 'solid', color: 'inset',   class: 'bg-surface-inset' },
    ],
    defaultVariants: { variant: 'glass', color: 'surface' },
  },
)

export interface AppBarProps extends VariantProps<typeof appBarVariants> {
  title?: string
  logo?: React.ReactNode
  actions?: React.ReactNode
  /** Override the menu-button handler. Inside an AppShell it defaults to toggling the nav. */
  onMenuClick?: () => void
}

const modeIcon: Record<ColorMode, React.ReactNode> = {
  light: <Sun className="h-5 w-5" />,
  dark: <Moon className="h-5 w-5" />,
  system: <MonitorSmartphone className="h-5 w-5" />,
}
const modeLabel: Record<ColorMode, string> = {
  light: 'Light — switch to dark',
  dark: 'Dark — switch to system',
  system: 'System — switch to light',
}

/**
 * ModeToggle — the light/dark/system switch, as a standalone control. Drop it
 * into an AppBar's `actions` (or anywhere else); it reads and cycles the theme
 * from the surrounding ThemeProvider.
 */
export function ModeToggle() {
  const { mode, cycleMode } = useTheme()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="icon" onClick={cycleMode} aria-label={modeLabel[mode]}>
            {modeIcon[mode]}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{modeLabel[mode]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function AppBar({
  title, logo, actions, onMenuClick, variant, color,
}: AppBarProps) {
  const appShell = useAppShell()
  const handleMenu = onMenuClick ?? appShell?.toggleNav

  return (
    <header className={cn(appBarVariants({ variant, color }))}>
      {handleMenu && (
        <Button variant="tertiary" size="icon" onClick={handleMenu} aria-label="Toggle navigation">
          <Menu className="h-5 w-5" />
        </Button>
      )}
      {logo}
      {title && <span className="text-sm font-semibold text-secondary">{title}</span>}

      <div className="ml-auto flex items-center gap-1">
        {actions}
      </div>
    </header>
  )
}
