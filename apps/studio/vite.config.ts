import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const pkg = (p: string) => resolve(here, '../../packages', p)

// Consume the workspace packages straight from source (no build step) via aliases —
// an own-the-source model, so an edit to a component or a token is reflected on the
// next HMR tick.
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@windforge/tokens/tokens.css': pkg('tokens/src/generated/tokens.css'),
      '@windforge/tokens/tailwind': pkg('tokens/src/generated/tailwind-tokens.cjs'),
      '@windforge/tokens': pkg('tokens/src/index.ts'),
      '@windforge/ui': pkg('ui/src/index.ts'),
      '@': resolve(here, 'src'),
    },
  },
  server: {
    port: 5174,
    fs: { allow: [resolve(here, '../..')] },
  },
})
