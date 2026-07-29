export type JobPriority = 'high' | 'low'
export type JobStatus = 'To Apply' | 'Applied'

export interface Job {
  id: string
  userId: string
  jobTitle: string
  jobUrl: string
  priority: JobPriority
  status: JobStatus
  createdAt: string
  updatedAt: string
}
