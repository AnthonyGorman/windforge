import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * Stepper — progress through a sequence of steps. `activeStep` is the 0-based
 * index of the current step; earlier steps render as completed (✓). Horizontal
 * by default; pass `orientation="vertical"` for a stacked flow.
 */
export interface Step {
  label: string
  description?: string
}
export interface StepperProps extends NoStyle<React.HTMLAttributes<HTMLOListElement>> {
  steps: Step[]
  activeStep: number
  orientation?: 'horizontal' | 'vertical'
}

function StepDot({ state, stepNumber }: { state: 'complete' | 'active' | 'upcoming'; stepNumber: number }) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors [&_svg]:size-4',
        state === 'complete' && 'border-transparent bg-surface-inverse text-inverse',
        state === 'active' && 'border-strong bg-surface-inset text-primary',
        state === 'upcoming' && 'border-strong bg-surface text-tertiary',
      )}
    >
      {state === 'complete' ? <Check /> : stepNumber}
    </span>
  )
}

export function Stepper({ steps, activeStep, orientation = 'horizontal', ...props }: StepperProps) {
  const vertical = orientation === 'vertical'
  const stateOf = (index: number) => (index < activeStep ? 'complete' : index === activeStep ? 'active' : 'upcoming')

  return (
    <ol className={cn(vertical ? 'flex flex-col' : 'flex items-start')} {...props}>
      {steps.map((step, index) => {
        const state = stateOf(index)
        const isLast = index === steps.length - 1
        return (
          <li
            key={step.label}
            aria-current={state === 'active' ? 'step' : undefined}
            className={cn('flex', vertical ? 'gap-3' : 'flex-1 items-start', !isLast && !vertical && 'pr-2')}
          >
            <div className={cn('flex', vertical ? 'flex-col items-center' : 'flex-col items-center', vertical && 'self-stretch')}>
              <StepDot state={state} stepNumber={index + 1} />
              {!isLast && vertical && (
                <span className={cn('my-1 w-px flex-1', index < activeStep ? 'bg-surface-inverse' : 'bg-border')} />
              )}
            </div>
            <div className={cn(vertical ? 'pb-6 pt-1' : 'mt-2 text-center', vertical ? 'text-left' : 'flex-1')}>
              <div className={cn('text-sm font-medium', state === 'upcoming' ? 'text-secondary' : 'text-primary')}>{step.label}</div>
              {step.description && <div className="text-sm text-tertiary">{step.description}</div>}
            </div>
            {!isLast && !vertical && (
              <span className={cn('mt-4 h-px flex-1', index < activeStep ? 'bg-surface-inverse' : 'bg-border')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
