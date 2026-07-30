import type { ButtonHTMLAttributes } from 'react'

import Spinner from './Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-cyan-400 text-slate-950 hover:bg-cyan-300 focus:ring-cyan-300',
  secondary:
    'border border-slate-700 bg-slate-900 text-white hover:border-slate-500 hover:bg-slate-800 focus:ring-slate-500',
  danger:
    'bg-rose-500 text-white hover:bg-rose-400 focus:ring-rose-400',
}

export default function Button({
  className = '',
  variant = 'primary',
  loading = false,
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={[
        'inline-flex min-h-9 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        className,
      ].join(' ')}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}