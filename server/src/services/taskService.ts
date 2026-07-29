import type { Task } from '../models/task.model'
import type { CreateTaskInput, TaskRepository, UpdateTaskInput } from '../repositories/taskRepository'
import type { UserRepository } from '../repositories/userRepository'
import { HttpError } from '../utils/httpError'
import { validateTaskInput, validateTaskUpdateInput } from '../utils/validation'

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository, private readonly userRepository?: UserRepository) {}

  list(userId: string): Promise<Task[]> {
    return this.taskRepository.findManyByUserId(userId)
  }

  async getById(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findByIdAndUserId(id, userId)

    if (!task) {
      throw new HttpError(404, 'Task not found.')
    }

    return task
  }

  async create(input: CreateTaskInput): Promise<Task> {
    // verify user exists to avoid foreign key constraint failures when tokens reference a different DB
    if (this.userRepository) {
      const user = await this.userRepository.findById(input.userId)
      if (!user) {
        throw new HttpError(401, 'Unauthorized.')
      }
    }

    const validInput = validateTaskInput(input)
    return this.taskRepository.create({
      ...validInput,
      userId: input.userId,
    })
  }

  async update(id: string, userId: string, input: UpdateTaskInput): Promise<Task> {
    const task = await this.taskRepository.findByIdAndUserId(id, userId)

    if (!task) {
      throw new HttpError(404, 'Task not found.')
    }

    const validInput = validateTaskUpdateInput(input)
    return this.taskRepository.update(id, validInput)
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findByIdAndUserId(id, userId)

    if (!task) {
      throw new HttpError(404, 'Task not found.')
    }

    await this.taskRepository.delete(id)
  }
}
