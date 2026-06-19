/**
 * The studio dogfoods the shipped preset: it consumes `@windforge/ui/tailwind`
 * exactly the way any downstream consumer would, so the preset can't silently
 * drift from what the components need. The only thing the app supplies is its own
 * `content` globs (its source + the library's, so Tailwind scans both for classes).
 */
module.exports = {
  presets: [require('@windforge/ui/tailwind')],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
}
