import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import PageContainer from '../../components/layout/PageContainer'
import DashboardSection from '../../components/dashboard/DashboardSection'
import JobListItem from '../../components/dashboard/JobListItem'
import TaskListItem from '../../components/dashboard/TaskListItem'
import { useAuth } from '../../context/AuthContext'
import { getApiErrorMessage } from '../../services/httpClient'
import { createJob, deleteJob, fetchJobs, updateJob } from '../../services/jobService'
import { createTask, deleteTask, fetchTasks, updateTask } from '../../services/taskService'
import type { Job, JobInput, Priority, Task, TaskInput } from '../../types/workboard'

type ActiveModal = 'create-job' | 'edit-job' | 'create-task' | 'edit-task' | null

type JobFormState = JobInput
type TaskFormState = Pick<TaskInput, 'title' | 'priority'>

const loadingCards = Array.from({ length: 2 })

const emptyJobForm: JobFormState = {
  jobTitle: '',
  jobUrl: '',
  priority: 'high',
  status: 'To Apply',
}

const emptyTaskForm: TaskFormState = {
  title: '',
  priority: 'high',
}

function filterByPriority<T extends { priority: Priority }>(items: T[], priority: Priority) {
  return items.filter((item) => item.priority === priority)
}

function DashboardLoadingCard() {
  return (
    <Card className="animate-pulse space-y-6">
      <div className="h-7 w-32 rounded-full bg-slate-800" />
      <div className="space-y-4">
        <div className="h-5 w-40 rounded-full bg-slate-800" />
        <div className="h-28 rounded-2xl bg-slate-900" />
        <div className="h-28 rounded-2xl bg-slate-900" />
      </div>
    </Card>
  )
}

function DashboardEmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 px-6 py-8 text-center">
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [jobForm, setJobForm] = useState<JobFormState>(emptyJobForm)
  const [taskForm, setTaskForm] = useState<TaskFormState>(emptyTaskForm)
  const [jobs, setJobs] = useState<Job[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [jobActionLoadingId, setJobActionLoadingId] = useState('')
  const [taskActionLoadingId, setTaskActionLoadingId] = useState('')
  const [jobFormLoading, setJobFormLoading] = useState(false)
  const [taskFormLoading, setTaskFormLoading] = useState(false)
  const [editingJobId, setEditingJobId] = useState<string | null>(null)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadDashboard() {
      try {
        setIsLoading(true)
        setError('')

        const [jobItems, taskItems] = await Promise.all([fetchJobs(), fetchTasks()])

        if (!mounted) {
          return
        }

        setJobs(jobItems)
        setTasks(taskItems)
      } catch (requestError) {
        if (mounted) {
          setError(getApiErrorMessage(requestError, 'Unable to load dashboard data.'))
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadDashboard()

    return () => {
      mounted = false
    }
  }, [])

  const [highJobs, lowJobs] = useMemo(
    () => [filterByPriority(jobs, 'high'), filterByPriority(jobs, 'low')],
    [jobs],
  )
  const [highTasks, lowTasks] = useMemo(
    () => [filterByPriority(tasks, 'high'), filterByPriority(tasks, 'low')],
    [tasks],
  )

  function requireLogin() {
    if (!user) {
      setShowLoginPrompt(true)
      return false
    }

    return true
  }

  function openCreateJobModal(priority: Priority = 'high') {
    if (!requireLogin()) {
      return
    }

    setEditingJobId(null)
    setJobForm({ ...emptyJobForm, priority })
    setActiveModal('create-job')
  }

  function openEditJobModal(job: Job) {
    setEditingJobId(job.id)
    setJobForm({
      jobTitle: job.jobTitle,
      jobUrl: job.jobUrl,
      priority: job.priority,
      status: job.status,
    })
    setActiveModal('edit-job')
  }

  function openCreateTaskModal(priority: Priority = 'high') {
    if (!requireLogin()) {
      return
    }

    setEditingTaskId(null)
    setTaskForm({ ...emptyTaskForm, priority })
    setActiveModal('create-task')
  }

  function openEditTaskModal(task: Task) {
    setEditingTaskId(task.id)
    setTaskForm({ title: task.title, priority: task.priority })
    setActiveModal('edit-task')
  }

  function closeModal() {
    setActiveModal(null)
    setJobForm(emptyJobForm)
    setTaskForm(emptyTaskForm)
    setEditingJobId(null)
    setEditingTaskId(null)
  }

  async function handleJobSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setJobFormLoading(true)
      setError('')

      if (editingJobId) {
        const updated = await updateJob(editingJobId, jobForm)
        setJobs((current) => current.map((job) => (job.id === updated.id ? updated : job)))
      } else {
        const created = await createJob(jobForm)
        setJobs((current) => [created, ...current])
      }

      closeModal()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to save job.'))
    } finally {
      setJobFormLoading(false)
    }
  }

  async function handleTaskSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setTaskFormLoading(true)
      setError('')

      const payload: TaskInput = { ...taskForm, completed: false }

      if (editingTaskId) {
        const currentTask = tasks.find((task) => task.id === editingTaskId)

        const updated = await updateTask(editingTaskId, {
          title: payload.title,
          priority: payload.priority,
          completed: currentTask?.completed ?? false,
        })

        setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task)))
      } else {
        const created = await createTask(payload)
        setTasks((current) => [created, ...current])
      }

      closeModal()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to save task.'))
    } finally {
      setTaskFormLoading(false)
    }
  }

  async function handleDeleteJob(job: Job) {
    const confirmed = window.confirm('Delete this job?')

    if (!confirmed) {
      return
    }

    try {
      setJobActionLoadingId(job.id)
      setError('')
      await deleteJob(job.id)
      setJobs((current) => current.filter((item) => item.id !== job.id))
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to delete job.'))
    } finally {
      setJobActionLoadingId('')
    }
  }

  async function handleDeleteTask(task: Task) {
    const confirmed = window.confirm('Delete this task?')

    if (!confirmed) {
      return
    }

    try {
      setTaskActionLoadingId(task.id)
      setError('')
      await deleteTask(task.id)
      setTasks((current) => current.filter((item) => item.id !== task.id))
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to delete task.'))
    } finally {
      setTaskActionLoadingId('')
    }
  }

  async function handleToggleTaskComplete(task: Task) {
    try {
      setTaskActionLoadingId(task.id)
      setError('')

      const updated = await updateTask(task.id, {
        title: task.title,
        priority: task.priority,
        completed: !task.completed,
      })

      setTasks((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to update task.'))
    } finally {
      setTaskActionLoadingId('')
    }
  }

  return (
    <PageContainer className="py-5 sm:py-6 lg:py-8">
      <div className="mb-6 flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
          Personal dashboard
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              WorkBoard Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Keep job opportunities and daily tasks in one fast, lightweight workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              Blue
            </span>
            <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-rose-200">
              High priority
            </span>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Applied
            </span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mb-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-2">
        {isLoading ? (
          <>
            {loadingCards.map((_, index) => (
              <DashboardLoadingCard key={index} />
            ))}
          </>
        ) : (
          <>
            <Card className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Jobs</h2>
                <Button className="rounded-full px-4 py-2 text-sm" onClick={() => openCreateJobModal('high')}>
                  Add Job
                </Button>
              </div>

              <div className="space-y-4">
                <DashboardSection
                  title="High Priority"
                  count={highJobs.length}
                  actionLabel="Add Job"
                  onAction={() => openCreateJobModal('high')}
                  accentClassName="bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
                >
                  {highJobs.length === 0 ? (
                    <DashboardEmptyState
                      title="No jobs yet"
                      message="Add a job to keep your high priority applications visible here."
                    />
                  ) : (
                    <div className="space-y-2">
                      {highJobs.map((job) => (
                        <JobListItem
                          key={job.id}
                          job={job}
                          isDeleting={jobActionLoadingId === job.id}
                          onDelete={handleDeleteJob}
                          onEdit={openEditJobModal}
                        />
                      ))}
                    </div>
                  )}
                </DashboardSection>

                <DashboardSection
                  title="Low Priority"
                  count={lowJobs.length}
                  actionLabel="Add Job"
                  onAction={() => openCreateJobModal('low')}
                  accentClassName="bg-slate-900 text-slate-200 hover:bg-slate-800"
                >
                  {lowJobs.length === 0 ? (
                    <DashboardEmptyState
                      title="No jobs yet"
                      message="Save lower priority opportunities here for later review."
                    />
                  ) : (
                    <div className="space-y-2">
                      {lowJobs.map((job) => (
                        <JobListItem
                          key={job.id}
                          job={job}
                          isDeleting={jobActionLoadingId === job.id}
                          onDelete={handleDeleteJob}
                          onEdit={openEditJobModal}
                        />
                      ))}
                    </div>
                  )}
                </DashboardSection>
              </div>
            </Card>

            <Card className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-white">Tasks</h2>
                <Button className="rounded-full px-4 py-2 text-sm" onClick={() => openCreateTaskModal('high')}>
                  Add Task
                </Button>
              </div>

              <div className="space-y-4">
                <DashboardSection
                  title="High Priority"
                  count={highTasks.length}
                  actionLabel="Add Task"
                  onAction={() => openCreateTaskModal('high')}
                  accentClassName="bg-rose-500/10 text-rose-200 hover:bg-rose-500/20"
                >
                  {highTasks.length === 0 ? (
                    <DashboardEmptyState
                      title="No tasks yet"
                      message="Add your important tasks here so they stay visible at the top."
                    />
                  ) : (
                    <div className="space-y-2">
                      {highTasks.map((task) => (
                        <TaskListItem
                          key={task.id}
                          task={task}
                          isUpdating={taskActionLoadingId === task.id}
                          onDelete={handleDeleteTask}
                          onEdit={openEditTaskModal}
                          onToggleComplete={handleToggleTaskComplete}
                        />
                      ))}
                    </div>
                  )}
                </DashboardSection>

                <DashboardSection
                  title="Low Priority"
                  count={lowTasks.length}
                  actionLabel="Add Task"
                  onAction={() => openCreateTaskModal('low')}
                  accentClassName="bg-slate-900 text-slate-200 hover:bg-slate-800"
                >
                  {lowTasks.length === 0 ? (
                    <DashboardEmptyState
                      title="No tasks yet"
                      message="Capture lighter work items here and keep your day organized."
                    />
                  ) : (
                    <div className="space-y-2">
                      {lowTasks.map((task) => (
                        <TaskListItem
                          key={task.id}
                          task={task}
                          isUpdating={taskActionLoadingId === task.id}
                          onDelete={handleDeleteTask}
                          onEdit={openEditTaskModal}
                          onToggleComplete={handleToggleTaskComplete}
                        />
                      ))}
                    </div>
                  )}
                </DashboardSection>
              </div>
            </Card>
          </>
        )}
      </div>

      <Modal
        open={activeModal === 'create-job' || activeModal === 'edit-job'}
        onClose={closeModal}
        title={activeModal === 'edit-job' ? 'Edit Job' : 'Add Job'}
      >
        <form className="space-y-4" onSubmit={handleJobSubmit}>
          <Input
            id="job-job-title"
            label="Job Title"
            required
            placeholder="Frontend Engineer"
            value={jobForm.jobTitle}
            onChange={(event) =>
              setJobForm((current) => ({ ...current, jobTitle: event.target.value }))
            }
          />
          <Input
            id="job-url"
            label="Job URL"
            required
            placeholder="https://example.com/job"
            value={jobForm.jobUrl}
            onChange={(event) =>
              setJobForm((current) => ({ ...current, jobUrl: event.target.value }))
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-200">
              <span>Priority</span>
              <select
                value={jobForm.priority}
                onChange={(event) =>
                  setJobForm((current) => ({
                    ...current,
                    priority: event.target.value as Priority,
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400"
              >
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-200">
              <span>Status</span>
              <select
                value={jobForm.status}
                onChange={(event) =>
                  setJobForm((current) => ({
                    ...current,
                    status: event.target.value as JobFormState['status'],
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400"
              >
                <option value="To Apply">To Apply</option>
                <option value="Applied">Applied</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={jobFormLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        title="Login required"
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-slate-300">
            You need to sign in before you can add or edit jobs and tasks.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>
              Stay here
            </Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={activeModal === 'create-task' || activeModal === 'edit-task'}
        onClose={closeModal}
        title={activeModal === 'edit-task' ? 'Edit Task' : 'Add Task'}
      >
        <form className="space-y-4" onSubmit={handleTaskSubmit}>
          <Input
            id="task-title"
            label="Task Title"
            required
            placeholder="Review application updates"
            value={taskForm.title}
            onChange={(event) =>
              setTaskForm((current) => ({ ...current, title: event.target.value }))
            }
          />

          <label className="space-y-2 text-sm font-medium text-slate-200">
            <span>Priority</span>
            <select
              value={taskForm.priority}
              onChange={(event) =>
                setTaskForm((current) => ({
                  ...current,
                  priority: event.target.value as Priority,
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-400"
            >
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </label>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" loading={taskFormLoading}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  )
}