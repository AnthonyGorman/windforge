import * as React from 'react'

export type ColorMode = 'light' | 'dark' | 'system'
export type ResolvedMode = 'light' | 'dark'

const MODE_KEY = 'wf-mode'

/**
 * Inline this in <head> BEFORE the app bundle to set the color mode on first
 * paint and avoid a flash of the wrong theme (SSR/SPA alike). Mirrors the mode
 * resolution below; reads the persisted `wf-mode`, falls back to system.
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 */
export function themeInitScript(storageKey: string = MODE_KEY): string {
  return `(function(){try{var m=localStorage.getItem('${storageKey}')||'system';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light';}catch(e){}})()`
}

const canUseDOM = typeof window !== 'undefined'
const readStoredMode = (): ColorMode | null => {
  try {
    return canUseDOM ? (localStorage.getItem(MODE_KEY) as ColorMode | null) : null
  } catch {
    return null
  }
}

const prefersDark = () =>
  canUseDOM && window.matchMedia('(prefers-color-scheme: dark)').matches
const resolveMode = (mode: ColorMode): ResolvedMode =>
  mode === 'system' ? (prefersDark() ? 'dark' : 'light') : mode
const nextMode = (mode: ColorMode): ColorMode =>
  mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light'

interface ThemeContextValue {
  mode: ColorMode
  resolvedMode: ResolvedMode
  setMode: (mode: ColorMode) => void
  cycleMode: () => void
}
const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultMode?: ColorMode
  /**
   * Runtime token overrides — a `--wf-*` → value map applied as custom properties
   * on the document root, so the whole app (including portaled overlays) re-skins
   * with no rebuild. Pass a function to stay mode-aware:
   * `tokens={(mode) => brandVars(ramp, mode)}`. For more than color, use
   * `themeVars({ brand, fontSans, radius, … }, mode)`. For a site's fixed identity,
   * prefer a static CSS `:root` override instead.
   */
  tokens?: Record<string, string> | ((mode: ResolvedMode) => Record<string, string>)
  persist?: boolean
}

export function ThemeProvider({ children, defaultMode = 'system', tokens, persist = true }: ThemeProviderProps) {
  const [mode, setModeState] = React.useState<ColorMode>(
    () => (persist && readStoredMode()) || defaultMode,
  )
  const [resolvedMode, setResolvedMode] = React.useState<ResolvedMode>(() => resolveMode(mode))

  const applyMode = (mode: ColorMode) => {
    const resolved = resolveMode(mode)
    setResolvedMode(resolved)
    if (!canUseDOM) return
    const root = document.documentElement

    const noTransitions = document.createElement('style')
    noTransitions.textContent = '*,*::before,*::after{transition:none!important}'
    document.head.appendChild(noTransitions)

    root.classList.toggle('dark', resolved === 'dark')
    root.style.colorScheme = resolved

    void root.offsetHeight
    window.setTimeout(() => noTransitions.remove(), 1)
  }

  const setMode = (mode: ColorMode) => {
    setModeState(mode)
    if (persist) {
      try {
        localStorage.setItem(MODE_KEY, mode)
      } catch {
        /* storage unavailable (private mode / SSR) — mode still applies in memory */
      }
    }
    applyMode(mode)
  }

  React.useEffect(() => {
    if (mode !== 'system') return
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const onSystemChange = () => applyMode('system')
    mediaQuery.addEventListener('change', onSystemChange)
    return () => mediaQuery.removeEventListener('change', onSystemChange)
  }, [mode])

  const value: ThemeContextValue = { mode, resolvedMode, setMode, cycleMode: () => setMode(nextMode(mode)) }
  const resolvedTokens = typeof tokens === 'function' ? tokens(resolvedMode) : tokens
  // Stable signature so the effect only re-applies when the values actually change.
  const tokenSig = resolvedTokens ? JSON.stringify(resolvedTokens) : ''

  // Apply runtime token overrides to the document ROOT (not an in-tree wrapper) so
  // they reach portaled overlays too — Dialog/DropdownMenu/Tooltip/Select/Toast/Sheet
  // render into document.body, outside any React subtree. Custom properties on
  // :root cascade everywhere. We track and remove exactly the keys we set.
  React.useLayoutEffect(() => {
    if (!canUseDOM || !tokenSig) return
    const map = JSON.parse(tokenSig) as Record<string, string>
    const root = document.documentElement
    const keys = Object.keys(map)
    for (const key of keys) root.style.setProperty(key, map[key])
    return () => {
      for (const key of keys) root.style.removeProperty(key)
    }
  }, [tokenSig])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a <ThemeProvider>')
  return ctx
}
