import type { Job as PrismaJob, PrismaClient } from '@prisma/client'

import type { Job } from '../../models/job.model'
import type { CreateJobInput, JobRepository, UpdateJobInput } from '../jobRepository'

function mapPriority(priority: PrismaJob['priority']): 'high' | 'low' {
  return priority === 'HIGH' ? 'high' : 'low'
}

function mapStatus(status: PrismaJob['status']): 'To Apply' | 'Applied' {
  return status === 'TO_APPLY' ? 'To Apply' : 'Applied'
}

function mapJob(job: PrismaJob): Job {
  return {
    id: job.id,
    userId: job.userId,
    jobTitle: job.jobTitle,
    jobUrl: job.jobUrl,
    priority: mapPriority(job.priority),
    status: mapStatus(job.status),
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  }
}

export class PrismaJobRepository implements JobRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findManyByUserId(userId: string): Promise<Job[]> {
    const jobs = await this.prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return jobs.map(mapJob)
  }

  async findById(id: string): Promise<Job | null> {
    const job = await this.prisma.job.findUnique({ where: { id } })
    return job ? mapJob(job) : null
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Job | null> {
    const job = await this.prisma.job.findFirst({ where: { id, userId } })
    return job ? mapJob(job) : null
  }

  async create(input: CreateJobInput): Promise<Job> {
    const job = await this.prisma.job.create({
      data: {
        userId: input.userId,
        jobTitle: input.jobTitle,
        jobUrl: input.jobUrl,
        priority: input.priority === 'high' ? 'HIGH' : 'LOW',
        status: input.status === 'To Apply' ? 'TO_APPLY' : 'APPLIED',
      },
    })

    return mapJob(job)
  }

  async update(id: string, input: UpdateJobInput): Promise<Job> {
    const job = await this.prisma.job.update({
      where: { id },
      data: {
        jobTitle: input.jobTitle,
        jobUrl: input.jobUrl,
        priority: input.priority === 'high' ? 'HIGH' : 'LOW',
        status: input.status === 'To Apply' ? 'TO_APPLY' : 'APPLIED',
      },
    })

    return mapJob(job)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.job.delete({ where: { id } })
  }
}
