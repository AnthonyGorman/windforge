import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, themeVars, Toaster } from '@windforge/ui'
import '@windforge/tokens/tokens.css'
import './index.css'
import App from './App'
import { StudioBrandProvider, useStudioBrand } from './theme/BrandContext'

// Bridges the studio identity selection into the provider's runtime token
// override. `themeVars` derives brand AND swaps the font (and could swap radius or
// any other token) in one call; the function form keeps it mode-aware. Applied at
// the document root, so the swap reaches the nav, chrome, and portaled overlays.
function ThemedApp() {
  const { ramp, fontSans } = useStudioBrand()
  return (
    <ThemeProvider defaultMode="system" persist tokens={(mode) => themeVars({ brand: ramp, fontSans }, mode)}>
      <App />
      <Toaster />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StudioBrandProvider>
        <ThemedApp />
      </StudioBrandProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
