import type { Job } from '../models/job.model'

export interface CreateJobInput {
  userId: string
  jobTitle: string
  jobUrl: string
  priority: 'high' | 'low'
  status: 'To Apply' | 'Applied'
}

export interface UpdateJobInput {
  jobTitle: string
  jobUrl: string
  priority: 'high' | 'low'
  status: 'To Apply' | 'Applied'
}

export interface JobRepository {
  findManyByUserId(userId: string): Promise<Job[]>
  findById(id: string): Promise<Job | null>
  findByIdAndUserId(id: string, userId: string): Promise<Job | null>
  create(input: CreateJobInput): Promise<Job>
  update(id: string, input: UpdateJobInput): Promise<Job>
  delete(id: string): Promise<void>
}
