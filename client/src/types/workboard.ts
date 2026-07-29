export type Priority = 'high' | 'low'
export type JobStatus = 'To Apply' | 'Applied'

export interface Job {
  id: string
  userId: string
  jobTitle: string
  jobUrl: string
  priority: Priority
  status: JobStatus
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  userId: string
  title: string
  priority: Priority
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface JobInput {
  jobTitle: string
  jobUrl: string
  priority: Priority
  status: JobStatus
}

export interface TaskInput {
  title: string
  priority: Priority
  completed: boolean
}
