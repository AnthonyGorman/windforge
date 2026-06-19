import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'
import { focusRingInset } from '../lib/recipes'
import { useAppShell } from './app-shell'

// ─── Nav row primitives (private to SideNav) ────────────────────────────────────
// Every row here is a clickable nav target — that's a menu, not a list — so these
// minimal helpers live with their only consumer instead of being a public `List`.
const NavList = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn('flex flex-col', className)} {...props} />
)

const navButtonBase =
  'group relative flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-left text-sm font-medium ' +
  'transition-colors disabled:opacity-40 disabled:pointer-events-none ' +
  '[&_svg]:size-[18px] [&_svg]:shrink-0 focus-visible:ring-inset ' + focusRingInset

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        navButtonBase,
        active ? 'bg-surface-inset text-primary' : 'text-secondary hover:bg-surface-inset hover:text-primary',
        className,
      )}
      {...props}
    />
  ),
)
NavButton.displayName = 'NavButton'

const NavSubheader = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn(
      'mt-md px-3 pb-1.5 pt-1 text-sm font-semibold uppercase tracking-wider text-tertiary first:mt-none',
      className,
    )}
    {...props}
  />
)

// ─── Nav config types (compatible with the MUI Windforge shape) ─────────────────
export interface NavLeafItem {
  type?: 'item'
  label: string
  path?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
export interface NavGroupItem {
  type: 'group'
  label: string
  icon?: React.ReactNode
  children: NavItem[]
  defaultOpen?: boolean
}
export interface NavSectionItem {
  type: 'section'
  label: string
  items: NavItem[]
}
export interface NavDividerItem {
  type: 'divider'
}
export type NavItem = NavLeafItem | NavGroupItem | NavSectionItem | NavDividerItem

export interface SideNavProps {
  items: NavItem[]
  activePath?: string
  onNavigate?: (path: string) => void
  logo?: React.ReactNode
}

// Indent nested rows by one spacing step per level, starting from the row's own
// left padding (px-3). The per-level unit is a token; depth 0 keeps the base.
const indent = (depth: number) => ({
  paddingLeft: depth > 0 ? `calc(0.75rem + ${depth} * var(--wf-spacing-md))` : undefined,
})

function NavLeaf({
  item, active, depth, onNavigate,
}: { item: NavLeafItem; active: boolean; depth: number; onNavigate: (path: string) => void }) {
  return (
    <li>
      <NavButton
        active={active}
        disabled={item.disabled}
        aria-current={active ? 'page' : undefined}
        style={indent(depth)}
        onClick={() => {
          item.onClick?.()
          if (item.path) onNavigate(item.path)
        }}
      >
        {active && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-surface-inverse" />}
        {item.icon}
        <span className="truncate">{item.label}</span>
        {item.badge && <span className="ml-auto">{item.badge}</span>}
      </NavButton>
    </li>
  )
}

function NavGroup({
  item, activePath, depth, onNavigate,
}: { item: NavGroupItem; activePath: string; depth: number; onNavigate: (path: string) => void }) {
  const containsActive = React.useMemo(() => hasActivePath(item.children, activePath), [item.children, activePath])
  const defaultValue = (item.defaultOpen ?? containsActive) ? 'group' : undefined

  return (
    <li>
      <AccordionPrimitive.Root type="single" collapsible defaultValue={defaultValue}>
        <AccordionPrimitive.Item value="group">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger asChild>
              <NavButton
                style={indent(depth)}
                className="data-[state=open]:[&_svg:last-of-type]:rotate-180"
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
                <ChevronDown className="ml-auto !size-4 transition-transform duration-200" />
              </NavButton>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <NavList>
              {item.children.map((child, index) => (
                <NavRenderer key={index} item={child} activePath={activePath} depth={depth + 1} onNavigate={onNavigate} />
              ))}
            </NavList>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      </AccordionPrimitive.Root>
    </li>
  )
}

function NavRenderer({
  item, activePath, depth, onNavigate,
}: { item: NavItem; activePath: string; depth: number; onNavigate: (path: string) => void }) {
  if (item.type === 'divider') return <li role="separator" className="my-sm h-px bg-border" />
  if (item.type === 'section') {
    return (
      <>
        <NavSubheader>{item.label}</NavSubheader>
        {item.items.map((child, index) => (
          <NavRenderer key={index} item={child} activePath={activePath} depth={depth} onNavigate={onNavigate} />
        ))}
      </>
    )
  }
  if (item.type === 'group') {
    return <NavGroup item={item} activePath={activePath} depth={depth} onNavigate={onNavigate} />
  }
  return <NavLeaf item={item} active={!!item.path && activePath === item.path} depth={depth} onNavigate={onNavigate} />
}

function hasActivePath(items: NavItem[], activePath: string): boolean {
  return items.some((item) => {
    if (item.type === 'group') return hasActivePath(item.children, activePath)
    if (item.type === 'section') return hasActivePath(item.items, activePath)
    if (!item.type || item.type === 'item') return item.path === activePath
    return false
  })
}

export function SideNav({ items, activePath = '/', onNavigate = () => {}, logo }: SideNavProps) {
  const appShell = useAppShell()
  const handleNavigate = (path: string) => {
    onNavigate(path)
    appShell?.closeNav()
  }
  return (
    <nav aria-label="Main navigation" className="flex h-full flex-col border-r border-border bg-surface-subtle">
      {logo && (
        <div className="flex h-16 shrink-0 items-center border-b border-border px-4">{logo}</div>
      )}
      <NavList className="flex-1 overflow-y-auto px-sm py-sm">
        {items.map((item, index) => (
          <NavRenderer key={index} item={item} activePath={activePath} depth={0} onNavigate={handleNavigate} />
        ))}
      </NavList>
    </nav>
  )
}
