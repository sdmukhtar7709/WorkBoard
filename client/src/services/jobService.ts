import { httpClient } from './httpClient'
import type { Job, JobInput } from '../types/workboard'

interface JobListResponse {
  success: true
  message: string
  data: {
    jobs: Job[]
  }
}

interface JobResponse {
  success: true
  message: string
  data: {
    job: Job
  }
}

interface MessageResponse {
  success: true
  message: string
}

export async function fetchJobs() {
  const response = await httpClient.get<JobListResponse>('/jobs')
  return response.data.data.jobs
}

export async function createJob(input: JobInput) {
  const response = await httpClient.post<JobResponse>('/jobs', input)
  return response.data.data.job
}

export async function updateJob(id: string, input: JobInput) {
  const response = await httpClient.put<JobResponse>(`/jobs/${id}`, input)
  return response.data.data.job
}

export async function deleteJob(id: string) {
  const response = await httpClient.delete<MessageResponse>(`/jobs/${id}`)
  return response.data.message
}
