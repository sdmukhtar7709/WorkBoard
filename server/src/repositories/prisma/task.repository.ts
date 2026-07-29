import type { PrismaClient, Task as PrismaTask } from '@prisma/client'

import type { Task } from '../../models/task.model'
import type { CreateTaskInput, TaskRepository, UpdateTaskInput } from '../taskRepository'

function mapPriority(priority: PrismaTask['priority']): 'high' | 'low' {
  return priority === 'HIGH' ? 'high' : 'low'
}

function mapTask(task: PrismaTask): Task {
  return {
    id: task.id,
    userId: task.userId,
    title: task.title,
    priority: mapPriority(task.priority),
    completed: task.completed,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }
}

export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findManyByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return tasks.map(mapTask)
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } })
    return task ? mapTask(task) : null
  }

  async findByIdAndUserId(id: string, userId: string): Promise<Task | null> {
    const task = await this.prisma.task.findFirst({ where: { id, userId } })
    return task ? mapTask(task) : null
  }

  async create(input: CreateTaskInput): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId: input.userId,
        title: input.title,
        priority: input.priority === 'high' ? 'HIGH' : 'LOW',
        completed: input.completed,
      },
    })

    return mapTask(task)
  }

  async update(id: string, input: UpdateTaskInput): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        title: input.title,
        priority: input.priority === 'high' ? 'HIGH' : 'LOW',
        completed: input.completed,
      },
    })

    return mapTask(task)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } })
  }
}
