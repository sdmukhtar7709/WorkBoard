import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export default function Input({
  id,
  label,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        id={id}
        className={[
          'w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 shadow-sm shadow-slate-950/20 outline-none transition-colors focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20',
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  )
}