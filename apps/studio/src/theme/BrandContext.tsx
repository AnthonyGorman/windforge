import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Ramp } from '@windforge/ui'
import { studioAccents } from './accents'

/**
 * Studio-level identity selection (brand + typeface). Lives ABOVE the
 * ThemeProvider so the Theming page (a deep route) can swap the whole app's
 * identity — nav, logo, chrome, and portaled overlays — by feeding the choices
 * into the provider's `tokens` prop via `themeVars`. Showcase wiring; a product
 * would set one identity and never expose a picker.
 */

/** Typeface choices — system/loaded stacks so the swap needs no extra network. */
export const studioFonts: { name: string; label: string; stack: string }[] = [
  { name: 'inter', label: 'Inter', stack: '"Inter", system-ui, -apple-system, sans-serif' },
  { name: 'system', label: 'System', stack: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { name: 'serif', label: 'Serif', stack: 'Georgia, "Times New Roman", serif' },
]

interface BrandContextValue {
  ramp: Ramp
  name: string
  setBrand: (name: string) => void
  accents: typeof studioAccents
  fontSans: string
  fontName: string
  setFont: (name: string) => void
  fonts: typeof studioFonts
}

const BrandContext = createContext<BrandContextValue | null>(null)

const BRAND_KEY = 'wf-studio-brand'
const FONT_KEY = 'wf-studio-font'

const readStored = (key: string, fallback: string, valid: (v: string) => boolean) => {
  if (typeof localStorage === 'undefined') return fallback
  const stored = localStorage.getItem(key)
  return stored && valid(stored) ? stored : fallback
}

export function StudioBrandProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState(() =>
    readStored(BRAND_KEY, studioAccents[0].name, (v) => studioAccents.some((a) => a.name === v)),
  )
  const [fontName, setFontName] = useState(() =>
    readStored(FONT_KEY, studioFonts[0].name, (v) => studioFonts.some((f) => f.name === v)),
  )

  const setBrand = (next: string) => {
    setName(next)
    if (typeof localStorage !== 'undefined') localStorage.setItem(BRAND_KEY, next)
  }
  const setFont = (next: string) => {
    setFontName(next)
    if (typeof localStorage !== 'undefined') localStorage.setItem(FONT_KEY, next)
  }

  const ramp = (studioAccents.find((a) => a.name === name) ?? studioAccents[0]).ramp
  const fontSans = (studioFonts.find((f) => f.name === fontName) ?? studioFonts[0]).stack

  const value = useMemo<BrandContextValue>(
    () => ({ ramp, name, setBrand, accents: studioAccents, fontSans, fontName, setFont, fonts: studioFonts }),
    [ramp, name, fontSans, fontName],
  )
  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
}

export function useStudioBrand() {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error('useStudioBrand must be used within <StudioBrandProvider>')
  return ctx
}
