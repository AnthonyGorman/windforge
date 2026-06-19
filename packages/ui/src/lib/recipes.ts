/**
 * RECIPES — named class-fragment bundles shared across components.
 *
 * These collapse the utility groups that repeat verbatim across many primitives
 * (focus rings, floating surfaces, menu rows, overlays) into one named class
 * each, so a component reads as `cn(floatingPanel, '…specifics…')` instead of a
 * wall of utilities. Compose them with `cn()` — because `cn` runs tailwind-merge,
 * a component can override any piece simply by adding the conflicting utility
 * after the recipe (e.g. `cn(floatingPanel, 'rounded-xl shadow-lg')`).
 *
 * Every utility here resolves to a token (`var(--wf-*)`), so these stay
 * theme- and accent-aware: the class is stable, the values move underneath it.
 */

/** Keyboard focus ring for standalone interactive controls (buttons, triggers, thumbs). */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background'

/** Focus ring with no offset — for controls that sit flush inside a container. */
export const focusRingInset =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** Focus treatment for text fields — recolors the border and adds a ring. */
export const focusRingField =
  'focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-ring'

/**
 * Floating surface for popovers / menus / listboxes. Radius (`rounded-lg`) and
 * shadow (`shadow-md`) are sensible defaults — override per component via `cn`.
 * Padding, width, max-height and entrance animation are left to the caller.
 */
export const floatingPanel =
  'z-50 rounded-lg border border-border bg-surface text-primary shadow-md outline-none'

/**
 * Structural recipe for a selectable row inside a menu / listbox. Intentionally
 * carries no focus colors or padding — those differ per surface (dropdown and
 * select both use `focus:bg-surface-inset`; autocomplete highlights the same way).
 */
export const menuItem =
  'relative flex cursor-pointer select-none items-center rounded-md text-sm outline-none ' +
  'transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

/** Full-screen scrim behind modal surfaces (dialog, sheet). */
export const overlayBackdrop = 'fixed inset-0 z-50 bg-overlay animate-fade-in'

/** The corner dismiss (×) button shared by dialog and sheet. Pair with `focusRingInset`. */
export const dismissButton =
  'absolute right-4 top-4 rounded-md p-1 text-secondary opacity-70 transition-opacity hover:opacity-100'
