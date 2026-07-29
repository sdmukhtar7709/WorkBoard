import type { JobStatus, Priority } from '../../types/workboard'

type StatusBadgeProps = {
  value: JobStatus | Priority
}

const badgeClasses: Record<JobStatus | Priority, string> = {
  high: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  'To Apply': 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  Applied: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
}

export default function StatusBadge({ value }: StatusBadgeProps) {
  return (
    <span
      className={[
        'inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
        badgeClasses[value],
      ].join(' ')}
    >
      {value}
    </span>
  )
}