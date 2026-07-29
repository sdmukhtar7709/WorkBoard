import type { Task } from '../models/task.model'

export interface CreateTaskInput {
  userId: string
  title: string
  priority: 'high' | 'low'
  completed: boolean
}

export interface UpdateTaskInput {
  title: string
  priority: 'high' | 'low'
  completed: boolean
}

export interface TaskRepository {
  findManyByUserId(userId: string): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  findByIdAndUserId(id: string, userId: string): Promise<Task | null>
  create(input: CreateTaskInput): Promise<Task>
  update(id: string, input: UpdateTaskInput): Promise<Task>
  delete(id: string): Promise<void>
}
