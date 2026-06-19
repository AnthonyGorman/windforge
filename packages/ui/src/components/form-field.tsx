import * as React from 'react'
import { CircleAlert } from 'lucide-react'
import { Label } from './label'
import { Text } from './text'
import { Input } from './input'
import { cn } from '../lib/utils'
import type { NoStyle } from '../lib/types'

/**
 * FormField — the on-system way to assemble a labelled control. For the common
 * case it renders the field for you: pass `label`, `description`, `placeholder`,
 * and `type` and it owns an `Input`. To wrap a different control (Textarea,
 * Select, Autocomplete) pass it as the single child instead. Either way FormField
 * generates the ids and wires `htmlFor`, `aria-describedby`, `aria-invalid`, and
 * the error/required state — so accessible, validated forms stay a one-liner and
 * never drift.
 *
 *   <FormField label="Email" description="We'll only use this to sign you in."
 *              type="email" placeholder="you@example.com" error={errors.email} required />
 *
 *   <FormField label="Notes" description="Optional.">
 *     <Textarea rows={3} />
 *   </FormField>
 *
 * Per the system's hue policy, the error MESSAGE text stays the normal foreground;
 * only the leading icon (and the control's outline) carry the status hue — matching
 * Alert and Toast. The state is never conveyed by color alone (icon + border + text).
 */
export interface FormFieldProps extends NoStyle<Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>> {
  label?: React.ReactNode
  /** Helper text below the label. Kept as normal foreground — meant to be read. */
  description?: React.ReactNode
  /** Placeholder forwarded onto the control. A prop set directly on a child wins. */
  placeholder?: string
  /** Input type for the default control (text, email, password, …). Forwarded onto the control. */
  type?: React.HTMLInputTypeAttribute
  /** Error message. Its presence puts the control into the invalid state. */
  error?: React.ReactNode
  required?: boolean
  /** Escape hatch: a non-Input control to wrap. Omit to let FormField render an Input. */
  children?: React.ReactElement
}

type FieldChildProps = {
  id?: string
  invalid?: boolean
  placeholder?: string
  type?: string
  'aria-describedby'?: string
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, description, placeholder, type, error, required, children, ...props }, ref) => {
    const uid = React.useId()
    const field = children ?? <Input />
    const childProps = field.props as FieldChildProps
    const fieldId = childProps.id ?? `${uid}-field`
    const descId = description ? `${uid}-desc` : undefined
    const errId = error ? `${uid}-err` : undefined
    const describedBy =
      [childProps['aria-describedby'], descId, errId].filter(Boolean).join(' ') || undefined
    const invalid = error != null || childProps.invalid

    const control = React.cloneElement(field, {
      id: fieldId,
      invalid: invalid || undefined,
      placeholder: childProps.placeholder ?? placeholder,
      type: childProps.type ?? type,
      'aria-describedby': describedBy,
      'aria-required': required || undefined,
    } as Partial<FieldChildProps> & Record<string, unknown>)

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5')} {...props}>
        {label != null && (
          <Label htmlFor={fieldId}>
            {label}
            {required && <span aria-hidden="true" className="text-error"> *</span>}
          </Label>
        )}
        {control}
        {description != null && error == null && (
          <Text span size="sm" id={descId}>
            {description}
          </Text>
        )}
        {error != null && (
          <div id={errId} className="flex items-start gap-1.5 text-sm text-primary">
            <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-error" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  },
)
FormField.displayName = 'FormField'
