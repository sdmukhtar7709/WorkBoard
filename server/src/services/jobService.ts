import type { Job } from '../models/job.model'
import type { JobRepository, CreateJobInput, UpdateJobInput } from '../repositories/jobRepository'
import type { UserRepository } from '../repositories/userRepository'
import { HttpError } from '../utils/httpError'
import { validateJobInput, validateJobUpdateInput } from '../utils/validation'

export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly userRepository?: UserRepository,
  ) {}

  list(userId: string): Promise<Job[]> {
    return this.jobRepository.findManyByUserId(userId)
  }

  async getById(id: string, userId: string): Promise<Job> {
    const job = await this.jobRepository.findByIdAndUserId(id, userId)

    if (!job) {
      throw new HttpError(404, 'Job not found.')
    }

    return job
  }

  async create(input: CreateJobInput): Promise<Job> {
    // verify user exists to avoid foreign key constraint failures when tokens reference a different DB
    if (this.userRepository) {
      const user = await this.userRepository.findById(input.userId)
      if (!user) {
        throw new HttpError(401, 'Unauthorized.')
      }
    }

    const validInput = validateJobInput(input)

    return this.jobRepository.create({
      ...validInput,
      userId: input.userId,
    })
  }

  async update(id: string, userId: string, input: UpdateJobInput): Promise<Job> {
    const job = await this.jobRepository.findByIdAndUserId(id, userId)

    if (!job) {
      throw new HttpError(404, 'Job not found.')
    }

    const validInput = validateJobUpdateInput(input)
    return this.jobRepository.update(id, validInput)
  }

  async remove(id: string, userId: string): Promise<void> {
    const job = await this.jobRepository.findByIdAndUserId(id, userId)

    if (!job) {
      throw new HttpError(404, 'Job not found.')
    }

    await this.jobRepository.delete(id)
  }
}
