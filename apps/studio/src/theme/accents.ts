import type { Ramp } from '@windforge/ui'

/**
 * STUDIO-OWNED ALTERNATE PALETTES.
 *
 * These are NOT part of the design system. The package ships exactly one brand
 * (indigo). They live here, in the app, to demonstrate the library's generic
 * runtime token-override: studio feeds any ramp through `brandVars(ramp, mode)`
 * and applies the result via the `ThemeProvider tokens` prop (or inline vars on a
 * scope). A real product would pick one brand and never ship the rest.
 */
export const studioAccents: { name: string; label: string; ramp: Ramp }[] = [
  {
    name: 'indigo',
    label: 'Indigo',
    ramp: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#b1bafb',
      500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b',
    },
  },
  {
    name: 'blue',
    label: 'Blue',
    ramp: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
    },
  },
  {
    name: 'teal',
    label: 'Teal',
    ramp: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
      500: '#14b8a6', 600: '#0d9488', 700: '#125b56', 800: '#115e59', 900: '#134e4a', 950: '#042f2e',
    },
  },
  {
    name: 'rose',
    label: 'Rose',
    ramp: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
      500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519',
    },
  },
  {
    name: 'amber',
    label: 'Amber',
    ramp: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03',
    },
  },
]
