/**
 * @windforge/ui — the shippable Tailwind PRESET.
 *
 * This is the single thing a consumer needs to be guaranteed-on-system. It wires
 * the generated token map into Tailwind's theme (colors, radius, shadow, spacing,
 * type, icon sizes), supplies every keyframe/animation the components reference,
 * and bundles the `tailwindcss-animate` plugin. Drop it into a project's
 * `tailwind.config` and the components render correctly with zero hand-copied config:
 *
 *   // tailwind.config.cjs
 *   module.exports = {
 *     presets: [require('@windforge/ui/tailwind')],
 *     content: [
 *       './src/**\/*.{ts,tsx}',
 *       './node_modules/@windforge/ui/src/**\/*.{ts,tsx}', // scan the lib's classes
 *     ],
 *   }
 *
 * The token VALUES are CSS variables, so a brand/font/radius swap happens by
 * overriding `--wf-*` (see @windforge/tokens) — never by editing this preset.
 */
const tokens = require('@windforge/tokens/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    // Tokens fully REPLACE Tailwind's default palette/scales — the design system
    // is the only source of truth. No raw Tailwind colors leak into components.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      ...tokens.colors,
    },
    borderRadius: tokens.borderRadius,
    boxShadow: { none: 'none', ...tokens.boxShadow },
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize,
    // Flat border-color utilities (border-strong, border-subtle, border-focus, …).
    borderColor: tokens.borderColor,
    extend: {
      spacing: tokens.spacing,
      size: tokens.size,
      borderWidth: tokens.borderWidth,
      ringColor: { DEFAULT: 'var(--wf-color-border-focus)' },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'scale-in': {
          from: { opacity: '0', scale: '0.96' },
          to: { opacity: '1', scale: '1' },
        },
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 200ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-out',
        'fade-in': 'fade-in 160ms ease-out',
        'scale-in': 'scale-in 160ms cubic-bezier(0.175,0.885,0.32,1.275)',
        'progress-indeterminate': 'progress-indeterminate 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
