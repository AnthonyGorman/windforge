/**
 * catalog.ts — machine-readable component registry for @windforge/ui.
 *
 * An AI or code-generation tool reads this to know the exact closed set of
 * components and the allowed values for every enum prop. Values are extracted
 * directly from the cva variant definitions in each component file; nothing
 * is invented here.
 */

import { layoutVocabulary } from './components/layout'

export interface ComponentSpec {
  /** one-line purpose */
  summary: string
  /** closed-vocabulary props → their allowed values (enums only) */
  props?: Record<string, readonly string[]>
  /** notable boolean/other props, name → short note */
  flags?: Record<string, string>
}

// Re-export so consumers can import vocabulary + catalog from one place.
export { layoutVocabulary }

export const catalog: Record<string, ComponentSpec> = {
  // ── layout primitives ──────────────────────────────────────────────────────

  Box: {
    summary: 'A padded, optionally-surfaced container — the on-system replacement for a bare <div>.',
    props: {
      padding:      layoutVocabulary.spacing,
      paddingX:     layoutVocabulary.spacing,
      paddingY:     layoutVocabulary.spacing,
      background:   layoutVocabulary.background,
      border:       layoutVocabulary.border,
      borderRadius: layoutVocabulary.borderRadius,
      boxShadow:    layoutVocabulary.boxShadow,
      maxWidth:     layoutVocabulary.maxWidth,
    },
    flags: {
      asChild: 'Render as a child element (polymorphic, replaces MUI component=)',
    },
  },

  Stack: {
    summary: 'A flex Box — the primary way to arrange children in a row or column with on-scale gap.',
    props: {
      direction:    layoutVocabulary.direction,
      gap:          layoutVocabulary.spacing,
      align:        layoutVocabulary.align,
      justify:      layoutVocabulary.justify,
      padding:      layoutVocabulary.spacing,
      paddingX:     layoutVocabulary.spacing,
      paddingY:     layoutVocabulary.spacing,
      background:   layoutVocabulary.background,
      border:       layoutVocabulary.border,
      borderRadius: layoutVocabulary.borderRadius,
      boxShadow:    layoutVocabulary.boxShadow,
      maxWidth:     layoutVocabulary.maxWidth,
    },
    flags: {
      wrap:    'flex-wrap when true',
      asChild: 'Render as a child element (polymorphic)',
    },
  },

  Grid: {
    summary: 'A closed-vocabulary CSS grid with responsive column counts and on-scale gap.',
    props: {
      cols:    layoutVocabulary.gridCols.map(String),
      mdCols:  layoutVocabulary.gridCols.map(String),
      gap:     layoutVocabulary.spacing,
      align:   ['start', 'center', 'end', 'stretch'],
      justify: ['start', 'center', 'end', 'stretch'],
    },
    flags: {
      asChild: 'Render as a child element (polymorphic)',
    },
  },

  // ── typography ─────────────────────────────────────────────────────────────

  Text: {
    summary: 'The typography primitive — renders a <p> by default; use asChild for semantics.',
    props: {
      size:    ['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      weight:  ['light', 'regular', 'medium', 'semibold', 'bold'],
      tone:    ['default', 'muted', 'subtle', 'disabled', 'inverse', 'brand', 'link', 'gradient'],
      align:   ['left', 'center', 'right'],
      variant: ['inline-code'],
    },
    flags: {
      truncate: 'Adds CSS truncation (single line ellipsis)',
      mono:     'Switches to monospace font',
      span:     'Render inline as a <span> instead of a block <p>',
      asChild:  'Render as the wrapped child element for semantic control',
    },
  },

  H1: {
    summary: 'Semantic headings: H1–H6 render the matching <h1>–<h6> with a sensible size default per level; override size freely. (H2…H6 share this API.)',
    props: {
      size:   ['sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
      weight: ['light', 'regular', 'medium', 'semibold', 'bold'],
      tone:   ['default', 'muted', 'subtle', 'disabled', 'inverse', 'brand', 'link'],
      align:  ['left', 'center', 'right'],
    },
    flags: {
      truncate: 'Adds CSS truncation',
    },
  },

  // ── action ─────────────────────────────────────────────────────────────────

  Button: {
    summary: 'The primary action element. Hierarchy is expressed through variant, never hue.',
    props: {
      variant: ['primary', 'secondary', 'tertiary', 'link', 'destructive'],
      size:    ['sm', 'md', 'lg', 'icon'],
    },
    flags: {
      asChild: 'Render as a child element (e.g. router link)',
    },
  },

  ButtonGroup: {
    summary: 'Joins a row of Buttons into a segmented control with shared edges and a single outer radius.',
    flags: {
      'children (Button elements)': 'Any Button variant; the group collapses the seams',
    },
  },

  ToggleButton: {
    summary: 'A pressable button inside ToggleButtonGroup that tracks selected state.',
    flags: {
      value: 'String identifier used by ToggleButtonGroup to track selection',
    },
  },

  ToggleButtonGroup: {
    summary: 'Segmented control; type="single" allows one selection, type="multiple" allows many.',
    props: {
      type: ['single', 'multiple'],
    },
  },

  Link: {
    summary: 'An inline anchor styled in the link color. Use asChild to wrap a router link.',
    props: {
      underline: ['hover', 'always', 'none'],
    },
    flags: {
      asChild: 'Render as a child element, keeping Link styling',
    },
  },

  // ── display / status ───────────────────────────────────────────────────────

  Badge: {
    summary: 'A static label pill for status, category, or count. Non-interactive.',
    props: {
      variant: ['brand', 'subtle', 'neutral', 'outline', 'success', 'warning', 'error', 'info'],
      size:    ['sm', 'md'],
    },
  },

  Chip: {
    summary: 'An interactive pill for filtering or selection. Distinct from Badge. Pass onDelete for a removable chip.',
    props: {
      size: ['sm', 'md'],
    },
    flags: {
      selected:  'Boolean — shows the neutral selected (inverse) fill when true',
      clickable: 'Set implicitly when onClick is provided',
      onDelete:  'Renders a trailing ✕ dismiss button',
      disabled:  'Dims and disables interaction',
      icon:      'Optional leading ReactNode (e.g. an icon)',
    },
  },

  Alert: {
    summary: 'An inline status message. Icon carries the hue; body text stays neutral.',
    props: {
      variant: ['neutral', 'info', 'success', 'warning', 'error'],
    },
    flags: {
      title:       'Heading (ReactNode)',
      description: 'Body text (ReactNode)',
      icon:        'Leading status icon (a lucide element)',
      actions:     'Trailing actions, typically buttons (ReactNode)',
    },
  },

  Avatar: {
    summary: 'A circular image or fallback initials display. The fallback text scales with size.',
    props: {
      size: ['sm', 'md', 'lg', 'xl'],
    },
    flags: {
      'AvatarImage src': 'Image URL; falls back to AvatarFallback when unresolvable',
      'AvatarFallback': 'Text shown while image loads or if it fails',
    },
  },

  // ── surface / container ────────────────────────────────────────────────────

  Card: {
    summary: 'A Box preset with surface background, default border, 2xl radius, and sm shadow. Accepts all Box props except className/style.',
    props: {
      padding:      layoutVocabulary.spacing,
      paddingX:     layoutVocabulary.spacing,
      paddingY:     layoutVocabulary.spacing,
      background:   layoutVocabulary.background,
      border:       layoutVocabulary.border,
      borderRadius: layoutVocabulary.borderRadius,
      boxShadow:    layoutVocabulary.boxShadow,
    },
    flags: {
      title:        'Heading (ReactNode)',
      description:  'Sub-heading body text (ReactNode)',
      headerAction: 'Trailing header content opposite the title, e.g. a Badge (ReactNode)',
      footer:       'Footer content, typically buttons (ReactNode)',
      children:     'Card body content',
    },
  },

  // ── form fields ────────────────────────────────────────────────────────────

  Input: {
    summary: 'A styled text input. Pass standard HTML input props (type, placeholder, disabled, …).',
    flags: {
      type:        'HTML input type (text, email, password, number, …)',
      placeholder: 'Placeholder text',
      disabled:    'Dims and disables the field',
      invalid:     'Error state — red outline + aria-invalid (usually set by FormField)',
    },
  },

  Textarea: {
    summary: 'A styled multiline text input. Pass standard HTML textarea props.',
    flags: {
      placeholder: 'Placeholder text',
      disabled:    'Dims and disables the field',
      rows:        'Number of visible text rows',
      invalid:     'Error state — red outline + aria-invalid (usually set by FormField)',
    },
  },

  Label: {
    summary: 'A form label that connects to a field via htmlFor (Radix Label under the hood).',
  },

  FormField: {
    summary: 'Renders a labelled control and wires the label, description, required marker, and error state with correct ids and ARIA. Renders an Input by default; pass a child to wrap Textarea/Select/Autocomplete. The on-system way to build accessible forms.',
    flags: {
      label:       'Field label (ReactNode); rendered as a <Label> bound to the control',
      description: 'Helper text below the label — normal foreground, meant to be read',
      placeholder: 'Placeholder forwarded onto the control (a prop on the child wins)',
      type:        'Input type for the default control (text, email, password, …)',
      error:       'Error message (ReactNode); its presence sets the control to invalid',
      required:    'Adds a required marker and aria-required',
      children:    'Escape hatch — a non-Input control to wrap; omit to render an Input',
    },
  },

  Select: {
    summary: 'A styled dropdown select. Pass an options array, or compose the primitives for groups/labels/custom triggers.',
    flags: {
      options:         'Array of { value: string; label: ReactNode; disabled?: boolean } — the props API',
      placeholder:     'Placeholder shown before a value is chosen',
      value:           'Controlled value',
      onValueChange:   'Callback with the selected value',
      disabled:        'Disables the trigger',
      invalid:         'Error state — red trigger outline + aria-invalid (usually set by FormField)',
      'SelectTrigger': 'Escape hatch: the visible trigger element',
      'SelectContent': 'Escape hatch: the dropdown panel',
      'SelectItem':    'Escape hatch: an individual option (value, children)',
      'SelectGroup':   'Escape hatch: groups items under a SelectLabel',
      'SelectLabel':   'Escape hatch: a non-selectable group heading',
      'SelectValue':   'Escape hatch: renders the current value inside SelectTrigger',
    },
  },

  Autocomplete: {
    summary: 'A searchable single-select combobox with keyboard navigation.',
    flags: {
      options:        'Array of { value: string; label: string }',
      value:          'Controlled current value (string | null)',
      onValueChange:  'Called with the new value or null on clear',
      placeholder:    'Input placeholder text',
      emptyText:      'Message shown when filter yields no results',
      disabled:       'Dims and disables the field',
      invalid:        'Error state — red field outline + aria-invalid (usually set by FormField)',
    },
  },

  MultiSelect: {
    summary: 'A searchable multi-value combobox. Selected values render as removable tags; the dropdown filters as you type. Controlled via value/onValueChange.',
    flags: {
      options:       'Array of { value: string; label: string }',
      value:         'Controlled selected values (string[])',
      onValueChange: 'Called with the new value array',
      placeholder:   'Field placeholder when nothing is selected',
      emptyText:     'Message shown when the filter yields no results',
      disabled:      'Dims and disables the field',
      invalid:       'Error state — red outline + aria-invalid (usually set by FormField)',
    },
  },

  DatePicker: {
    summary: 'A single-date field: a styled trigger that opens the Calendar in a Popover. Controlled via value/onValueChange. For ranges, use Calendar directly.',
    flags: {
      value:         'Selected Date (or undefined)',
      onValueChange: 'Called with the chosen Date (or undefined)',
      placeholder:   'Trigger text before a date is chosen',
      disabled:      'Dims and disables the trigger',
      invalid:       'Error state — red outline + aria-invalid (usually set by FormField)',
      formatOptions: 'Intl.DateTimeFormatOptions for the displayed value',
    },
  },

  Calendar: {
    summary: 'The date grid (react-day-picker), token-styled with no vendor CSS. Pass any react-day-picker prop — mode="single|range|multiple", selected, onSelect.',
    props: {
      mode: ['single', 'multiple', 'range'],
    },
    flags: {
      selected:        'Selected date(s) — shape depends on mode',
      onSelect:        'Selection callback — shape depends on mode',
      showOutsideDays: 'Render days from adjacent months (default true)',
    },
  },

  Command: {
    summary: 'A fast, filterable command menu / palette (cmdk). Compose Command > CommandInput + CommandList (CommandEmpty/CommandGroup/CommandItem/CommandSeparator), or use CommandDialog for a ⌘K palette.',
    flags: {
      'CommandInput':     'The search field',
      'CommandList':      'Scrollable results region',
      'CommandEmpty':     'Shown when nothing matches',
      'CommandGroup':     'A labelled group (heading prop)',
      'CommandItem':      'A selectable row (onSelect, value)',
      'CommandSeparator': 'A divider between groups',
      'CommandShortcut':  'Trailing keyboard hint',
      'CommandDialog':    'The palette in a centered overlay (open, onOpenChange)',
    },
  },

  Checkbox: {
    summary: 'A binary toggle. Pair with Label for an accessible label.',
    flags: {
      checked:         'Controlled checked state',
      onCheckedChange: 'Callback with the new boolean',
      disabled:        'Disables the checkbox',
    },
  },

  RadioGroup: {
    summary: 'A group of mutually exclusive RadioGroupItem options.',
    flags: {
      value:         'Controlled value',
      onValueChange: 'Callback with the selected value',
      'RadioGroupItem value': 'The string value for each item; pair with Label',
    },
  },

  Switch: {
    summary: 'A toggle switch (on/off). Pair with Label for an accessible label.',
    flags: {
      checked:         'Controlled checked state',
      onCheckedChange: 'Callback with the new boolean',
      disabled:        'Disables the switch',
    },
  },

  Slider: {
    summary: 'A range slider for numeric input.',
    flags: {
      value:         'Controlled value array e.g. [50]',
      onValueChange: 'Callback with the new value array',
      min:           'Minimum value (default 0)',
      max:           'Maximum value (default 100)',
      step:          'Step increment',
      disabled:      'Disables the slider',
    },
  },

  // ── navigation / disclosure ────────────────────────────────────────────────

  Tabs: {
    summary: 'Tabbed content switcher. Pass an items array, or compose TabsList/TabsTrigger/TabsContent by hand.',
    flags: {
      items:         'Array of { value, label, content, disabled? } — the props API',
      defaultValue:  'Initially active tab value',
      value:         'Controlled active tab value',
      onValueChange: 'Callback with new tab value',
      'TabsList / TabsTrigger / TabsContent': 'Escape hatch primitives for hand-composition',
    },
  },

  Accordion: {
    summary: 'Vertically stacked collapsible sections. Pass an items array, or compose the primitives. type="single" or "multiple".',
    props: {
      type: ['single', 'multiple'],
    },
    flags: {
      items:       'Array of { value, trigger, content, disabled? } — the props API',
      collapsible: 'When type="single", allows deselecting the open item',
      'AccordionItem / AccordionTrigger / AccordionContent': 'Escape hatch primitives for hand-composition',
    },
  },

  Breadcrumb: {
    summary: 'Navigation trail. Pass an items array; the last item is the current (non-link) page.',
    flags: {
      items:     'Array of { label: ReactNode, href?: string }; the final item renders as the current page',
      separator: 'Divider between crumbs; defaults to a ChevronRight (ReactNode)',
    },
  },

  Pagination: {
    summary: 'Controlled page navigation with previous/next buttons, a window of sibling pages, and ellipses.',
    flags: {
      page:          '1-based current page number',
      count:         'Total number of pages',
      onPageChange:  'Callback with the new page number',
      siblingCount:  'Number of pages to show on each side of the current (default 1)',
    },
  },

  Stepper: {
    summary: 'Linear progress through a sequence of named steps.',
    props: {
      orientation: ['horizontal', 'vertical'],
    },
    flags: {
      steps:      'Array of { label: string; description?: string }',
      activeStep: '0-based index of the current step',
    },
  },

  // ── overlays ───────────────────────────────────────────────────────────────

  Dialog: {
    summary: 'A convenience overlay with title, description, and footer actions — built on Modal.',
    props: {
      size: ['sm', 'md', 'lg', 'xl'],
    },
    flags: {
      trigger:     'The element that opens the dialog',
      title:       'Heading text (required)',
      description: 'Body text below the title',
      actions:     'ReactNode for the footer, typically buttons',
      open:        'Controlled open state',
      onOpenChange:'Callback when open state changes',
    },
  },

  Modal: {
    summary: 'Low-level composable overlay (Radix Dialog). Use Dialog for the common case.',
    props: {
      size: ['sm', 'md', 'lg', 'xl'],
    },
    flags: {
      'ModalTrigger': 'The trigger element; use asChild to keep your button',
      'ModalContent': 'The panel; size prop sets max-width',
      'ModalClose':   'Programmatic close trigger; use asChild',
      hideClose:      'Hide the default corner ✕ on ModalContent',
    },
  },

  Popover: {
    summary: 'A small floating panel anchored to a trigger. Compose: Popover > PopoverTrigger + PopoverContent.',
    flags: {
      'PopoverTrigger asChild': 'Attach the trigger to your own element',
      'PopoverContent align':   'Alignment relative to the trigger (start|center|end)',
      'PopoverContent sideOffset': 'Distance from the trigger in px (default 6)',
    },
  },

  Sheet: {
    summary: 'A slide-in drawer anchored to a screen edge.',
    props: {
      side: ['top', 'bottom', 'left', 'right'],
    },
    flags: {
      'SheetTrigger asChild': 'Attach the trigger to your own element',
      'SheetContent title':       'Accessible sheet title (ReactNode)',
      'SheetContent description': 'Supporting body text (ReactNode)',
      'SheetContent footer':      'Action row pinned to the bottom (ReactNode)',
      'SheetClose asChild':       'Programmatic close trigger',
    },
  },

  DropdownMenu: {
    summary: 'A contextual menu anchored to a trigger. Pass trigger + items for the common case, or compose the primitives for checkboxes, radios, and sub-menus.',
    flags: {
      trigger:                       'The element that opens the menu (rendered via asChild)',
      items:                         'Array of { label, icon?, shortcut?, onSelect?, disabled? } | { type: "separator" } | { type: "label", label } — the props API',
      'DropdownMenuTrigger asChild': 'Escape hatch: use your own element as the trigger',
      'DropdownMenuContent':         'Escape hatch: the floating menu panel',
      'DropdownMenuItem':            'Escape hatch: a clickable item; inset adds left padding',
      'DropdownMenuCheckboxItem':    'Escape hatch: a checkable item',
      'DropdownMenuRadioGroup / DropdownMenuRadioItem': 'Escape hatch: radio group + items',
      'DropdownMenuLabel / DropdownMenuSeparator / DropdownMenuShortcut': 'Escape hatch: label, divider, shortcut',
      'DropdownMenuSub / DropdownMenuSubTrigger / DropdownMenuSubContent': 'Escape hatch: nested sub-menus',
    },
  },

  Tooltip: {
    summary: 'A floating label on hover/focus. Wrap with TooltipProvider at the app root.',
    flags: {
      'TooltipProvider':        'Render once near the app root to share delay',
      'TooltipTrigger asChild': 'Attach the tooltip to your own element',
      'TooltipContent':         'The tooltip bubble; sideOffset adjusts distance',
    },
  },

  // ── feedback / progress ────────────────────────────────────────────────────

  Progress: {
    summary: 'A horizontal progress bar. value is 0–100.',
    flags: {
      value:         'Number 0–100 representing completion percentage',
      indeterminate: 'Looping animation for work of unknown duration; ignores value',
    },
  },

  Skeleton: {
    summary: 'An animated placeholder while content loads. Size with width/height via className on Box.',
    flags: {
      'className (via Box wrapper)': 'Use Box className to size the skeleton',
    },
  },

  Toast: {
    summary: 'Transient status notifications. Call toast({...}) imperatively; render <Toaster /> once near root.',
    props: {
      variant: ['neutral', 'success', 'error', 'warning', 'info'],
    },
    flags: {
      title:       'Heading text',
      description: 'Body text',
      duration:    'Auto-dismiss time in ms (default 5000; 0 = permanent)',
      action:      'ReactNode action slot inside the toast',
      'Toaster':   'Place once near the app root to render active toasts',
    },
  },

  // ── data display ───────────────────────────────────────────────────────────

  Table: {
    summary: 'A semantic table. Pass columns + data for the common case, or compose the primitives for full control.',
    flags: {
      columns:        'Array of { header, accessor: key | (row) => ReactNode, align? } — the props API',
      data:           'Array of row objects rendered against columns',
      caption:        'Caption rendered below the table (ReactNode)',
      'TableHeader / TableBody / TableFooter': 'Escape hatch: thead / tbody / tfoot wrappers',
      'TableRow':     'Escape hatch: tr with hover and selected states',
      'TableHead / TableCell': 'Escape hatch: th / td; both take align="left|center|right"',
      'TableCaption': 'Escape hatch: caption rendered below the table',
    },
  },

  DataTable: {
    summary: 'The batteries-included table: column sorting, row selection, and optional client-side pagination, built on the Table primitives. Pass columns + data + rowKey.',
    flags: {
      columns:          'Array of { header, accessor, align?, sortable?, sortAccessor? }',
      data:             'Array of row objects',
      rowKey:           '(row) => string — stable id for selection and keys (required)',
      selectable:       'Adds a select-all + per-row checkbox column',
      selected:         'Controlled selection (array of ids); omit for uncontrolled',
      onSelectedChange: 'Callback with the new selected id array',
      pageSize:         'Enable client-side pagination at this page size',
      caption:          'Caption rendered below the table',
      emptyState:       'Content shown when there are no rows',
    },
  },

  Chart: {
    summary: 'A token-driven ECharts surface. Pass a standard ECharts option; palette, axes, tooltip, and fonts are themed from the live --wf-* tokens and re-skin with the brand and color mode automatically. Auto-resizes.',
    flags: {
      option:   'A standard ECharts option object (xAxis/yAxis/series/…)',
      height:   'Pixel or CSS height; width fills the container (default 320)',
      notMerge: 'Replace the previous option wholesale instead of merging (default true)',
      onEvents: 'Map of ECharts event name → handler',
    },
  },

  // ── utility / decoration ──────────────────────────────────────────────────

  Separator: {
    summary: 'A horizontal or vertical visual divider.',
    props: {
      orientation: ['horizontal', 'vertical'],
    },
  },

  CodeBlock: {
    summary: 'A syntax-highlighted code surface. Highlighting runs locally (prism-react-renderer, no API); the theme is built from --wf-* tokens, so it re-skins with mode and brand automatically.',
    flags: {
      code:            'The source string to render',
      language:        "Prism language id (default 'tsx')",
      filename:        'Optional header filename, shown with the language label',
      showLineNumbers: 'Render a 1-based line-number gutter',
      highlightLines:  'Array of 1-based line numbers to emphasize',
      wrap:            'Soft-wrap long lines instead of scrolling',
      maxHeight:       "Max height before vertical scroll, e.g. '24rem'",
      copyable:        'Show the copy button (default true)',
    },
  },

  // ── app chrome / layout ────────────────────────────────────────────────────

  AppShell: {
    summary: 'The guaranteed-layout frame: fixed sidebar on desktop, Sheet drawer on mobile, sticky header, scrollable main. Pass header and sidebar as slots.',
    flags: {
      header:    'Top-bar slot, typically an <AppBar>',
      sidebar:   'Side-navigation slot, typically a <SideNav>',
      fullBleed: 'Drop the default main padding for edge-to-edge content',
    },
  },

  AppBar: {
    summary: 'The sticky top bar slot for AppShell: menu toggle, logo, title, and actions. Drop a <ModeToggle/> into actions for the light/dark/system switch.',
    props: {
      variant: ['glass', 'solid'],
      color:   ['surface', 'subtle', 'inset'],
    },
    flags: {
      title:       'Optional title text',
      logo:        'Optional logo ReactNode',
      actions:     'Right-aligned action ReactNode(s) — e.g. a <ModeToggle/>',
      onMenuClick: 'Override the menu-button handler (defaults to toggling the nav)',
    },
  },

  SideNav: {
    summary: 'The data-driven side navigation: pass a typed items tree (item | group | section | divider); renders active state, nesting, and mobile drawer integration.',
    flags: {
      items:      'NavItem[] — the navigation tree (item/group/section/divider)',
      activePath: 'The currently active path, highlighted in the tree',
      onNavigate: 'Called with a path when a leaf is activated',
      logo:       'Optional logo ReactNode pinned to the nav header',
    },
  },

  ThemeProvider: {
    summary: 'Provides color mode (light/dark/system) and optional runtime --wf-* token overrides for live re-skinning. Wrap the app once near the root.',
    flags: {
      defaultMode: 'Initial color mode: light | dark | system (default system)',
      tokens:      'A --wf-* override map, or (mode) => map for mode-aware brand swaps',
      persist:     'Persist the chosen mode to localStorage (default true)',
    },
  },
}
