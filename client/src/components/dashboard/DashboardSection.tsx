import type { ReactNode } from 'react'

type DashboardSectionProps = {
  title: string
  count?: number
  actionLabel: string
  onAction: () => void
  accentClassName: string
  children: ReactNode
}

export default function DashboardSection({
  title,
  count,
  actionLabel,
  onAction,
  accentClassName,
  children,
}: DashboardSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
          {typeof count === 'number' ? (
            <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              {count}
            </span>
          ) : null}
        </div>
        <button
          className={[
            'rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm',
            accentClassName,
          ].join(' ')}
          onClick={onAction}
          type="button"
        >
          {actionLabel}
        </button>
      </div>

      {children}
    </section>
  )
}