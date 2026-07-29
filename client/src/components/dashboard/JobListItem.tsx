import Button from '../ui/Button'
import StatusBadge from './StatusBadge'
import type { Job } from '../../types/workboard'

type JobListItemProps = {
  job: Job
  onEdit: (job: Job) => void
  onDelete: (job: Job) => void
  isDeleting?: boolean
}

export default function JobListItem({ job, onEdit, onDelete, isDeleting = false }: JobListItemProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 shadow-lg shadow-slate-950/20 transition-transform duration-200 hover:-translate-y-0.5 hover:border-slate-700">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge value={job.status} />
            <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              {job.priority}
            </span>
          </div>

          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-sm font-semibold text-white transition-colors hover:text-cyan-300 sm:text-base"
            title={job.jobTitle}
          >
            {job.jobTitle}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-cyan-400 hover:text-cyan-300"
          >
            Open Job
          </a>
          <Button
            variant="secondary"
            className="rounded-full px-3 py-1.5 text-xs"
            onClick={() => onEdit(job)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="rounded-full px-3 py-1.5 text-xs"
            loading={isDeleting}
            onClick={() => onDelete(job)}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  )
}