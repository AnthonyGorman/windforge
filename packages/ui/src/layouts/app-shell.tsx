import * as React from 'react'
import { Sheet, SheetContent } from '../components/sheet'
import { Box } from '../components/layout'
import { useMediaQuery } from '../lib/use-media-query'
import { cn } from '../lib/utils'

const NAV_WIDTH = 256

interface AppShellContextValue {
  /** Toggle the sidebar — collapses it on desktop, opens/closes the drawer on mobile. */
  toggleNav: () => void
  /** Close the mobile drawer (no-op on desktop). */
  closeNav: () => void
}
const AppShellContext = React.createContext<AppShellContextValue | null>(null)

/** Read the AppShell coordination handles. Returns null outside an AppShell. */
export const useAppShell = () => React.useContext(AppShellContext)

export interface AppShellProps {
  /** The top bar slot — typically an `<AppBar>`. Rendered inside the shell so it
   *  can drive the nav via {@link useAppShell}. */
  header?: React.ReactNode
  /** The side navigation slot — typically a `<SideNav>`. */
  sidebar?: React.ReactNode
  children: React.ReactNode
  fullBleed?: boolean
  /** Whether the desktop sidebar starts expanded. Set `false` to open collapsed
   *  — e.g. a personal site where the nav is secondary. The menu button (and
   *  `useAppShell().toggleNav`) flips it. Defaults to `true`. */
  defaultNavOpen?: boolean
}

/**
 * AppShell — the guaranteed-layout chrome: a fixed sidebar on desktop, a Sheet
 * drawer on mobile, a sticky bar, and a scrollable main. `header` and `sidebar`
 * are slots (their own components, `AppBar` and `SideNav`); AppShell only owns
 * the responsive frame and exposes toggle/close handles via {@link useAppShell}.
 */
export function AppShell({ header, sidebar, children, fullBleed = false, defaultNavOpen = true }: AppShellProps) {
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const [navOpen, setNavOpen] = React.useState(defaultNavOpen)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const ctx = React.useMemo<AppShellContextValue>(
    () => ({
      toggleNav: () => (isMobile ? setDrawerOpen((o) => !o) : setNavOpen((o) => !o)),
      closeNav: () => setDrawerOpen(false),
    }),
    [isMobile],
  )

  const desktopNavVisible = !isMobile && navOpen

  return (
    <AppShellContext.Provider value={ctx}>
      <div className="flex min-h-screen bg-background text-primary">
        {desktopNavVisible && sidebar && (
          <aside className="fixed inset-y-0 left-0 z-20 shrink-0" style={{ width: NAV_WIDTH }}>
            {sidebar}
          </aside>
        )}

        <Sheet open={isMobile && drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetContent side="left">
            <Box className="-m-6 h-[calc(100%+3rem)] w-64">{sidebar}</Box>
          </SheetContent>
        </Sheet>

        <div
          className="flex min-w-0 flex-1 flex-col transition-[margin] duration-normal"
          style={{ marginLeft: desktopNavVisible ? NAV_WIDTH : 0 }}
        >
          {header}
          <main className={cn('flex-1 overflow-auto', !fullBleed && 'px-gutter py-lg md:px-xl')}>{children}</main>
        </div>
      </div>
    </AppShellContext.Provider>
  )
}
