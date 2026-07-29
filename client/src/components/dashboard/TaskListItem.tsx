import Button from '../ui/Button'
import type { Task } from '../../types/workboard'

type TaskListItemProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onToggleComplete: (task: Task) => void
  isUpdating?: boolean
}

export default function TaskListItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isUpdating = false,
}: TaskListItemProps) {
  return (
    <article
      className={[
        'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-lg shadow-slate-950/20 transition-transform duration-200 hover:-translate-y-0.5',
        task.completed
          ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30'
          : 'border-slate-800 bg-slate-900/70 hover:border-slate-700',
      ].join(' ')}
    >
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <input
          checked={task.completed}
          disabled={isUpdating}
          onChange={() => onToggleComplete(task)}
          type="checkbox"
          className="h-5 w-5 rounded border-slate-700 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
        />
        <span
          className={[
            'min-w-0 text-sm font-medium text-white',
            task.completed ? 'line-through opacity-50' : '',
          ].join(' ')}
        >
          {task.title}
        </span>
      </label>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          className="rounded-full px-3 py-1.5 text-xs"
          onClick={() => onEdit(task)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          className="rounded-full px-3 py-1.5 text-xs"
          loading={isUpdating}
          onClick={() => onDelete(task)}
        >
          Delete
        </Button>
      </div>
    </article>
  )
}