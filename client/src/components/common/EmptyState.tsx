import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export default function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 px-6 py-8 text-center shadow-2xl shadow-slate-950/20">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 text-cyan-300">
        {icon ?? <span className="text-2xl">✨</span>}
      </div>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
