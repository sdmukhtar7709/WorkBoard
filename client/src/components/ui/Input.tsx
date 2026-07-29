import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export default function Input({
  id,
  label,
  className = '',
  error,
  ...props
}: InputProps) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        id={id}
        className={[
          'w-full rounded-xl border bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 shadow-sm shadow-slate-950/20 outline-none transition-colors focus:ring-2 focus:ring-cyan-400/20',
          error
            ? 'border-rose-500 focus:border-rose-400 focus:ring-rose-400/20'
            : 'border-slate-700 focus:border-cyan-400',
          className,
        ].join(' ')}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}