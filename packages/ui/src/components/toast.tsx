import * as React from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { focusRingInset } from '../lib/recipes'

/**
 * Toast / Snackbar — a transient message. Call `toast({...})` from anywhere
 * (event handlers, effects, outside React), and render `<Toaster />` once near
 * the app root. Text stays the normal foreground; only the icon carries the
 * status hue (matching Alert).
 */
export type ToastVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
}
interface ToastRecord extends ToastOptions {
  id: number
}

// ── tiny external store (callable outside React) ────────────────────────────────
let toasts: ToastRecord[] = []
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((listener) => listener())
let nextId = 0

export function toast(options: ToastOptions): number {
  const id = nextId++
  const duration = options.duration ?? 5000
  toasts = [...toasts, { variant: 'neutral', ...options, duration, id }]
  emit()
  if (duration > 0) window.setTimeout(() => dismissToast(id), duration)
  return id
}
export function dismissToast(id: number) {
  toasts = toasts.filter((existing) => existing.id !== id)
  emit()
}

function useToasts() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange)
      return () => listeners.delete(onStoreChange)
    },
    () => toasts,
    () => toasts,
  )
}

const ICONS: Record<ToastVariant, React.ReactNode | null> = {
  neutral: null,
  success: <CheckCircle2 className="text-success" />,
  error: <XCircle className="text-error" />,
  warning: <AlertTriangle className="text-warning" />,
  info: <Info className="text-info" />,
}

function ToastItem({ toast }: { toast: ToastRecord }) {
  // Urgent variants interrupt the screen reader; the rest announce politely.
  const urgent = toast.variant === 'error' || toast.variant === 'warning'
  return (
    <li
      role={urgent ? 'alert' : 'status'}
      aria-live={urgent ? 'assertive' : 'polite'}
      className="pointer-events-auto flex w-80 gap-3 rounded-xl border border-border bg-surface p-4 text-primary shadow-lg animate-scale-in [&_svg]:size-5 [&_svg]:shrink-0"
    >
      {toast.variant && toast.variant !== 'neutral' && <span className="mt-0.5">{ICONS[toast.variant]}</span>}
      <div className="min-w-0 flex-1">
        {toast.title && <div className="font-semibold leading-snug">{toast.title}</div>}
        {toast.description && <div className="text-sm text-primary">{toast.description}</div>}
        {toast.action && <div className="mt-2">{toast.action}</div>}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => dismissToast(toast.id)}
        className={cn('-mr-1 -mt-1 h-fit rounded-md p-1 text-secondary opacity-70 transition-opacity hover:opacity-100', focusRingInset)}
      >
        <X className="h-4 w-4" />
      </button>
    </li>
  )
}

const emptySubscribe = () => () => {}

export function Toaster() {
  const activeToasts = useToasts()
  // Hydration gate: false on the server snapshot, true once on the client — no
  // mismatch, and no Effect needed to flip a `mounted` flag.
  const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false)
  if (!mounted) return null
  return createPortal(
    <ol className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-80 flex-col gap-2">
      {activeToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </ol>,
    document.body,
  )
}
