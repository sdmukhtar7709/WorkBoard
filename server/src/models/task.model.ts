export type TaskPriority = 'high' | 'low'

export interface Task {
  id: string
  userId: string
  title: string
  priority: TaskPriority
  completed: boolean
  createdAt: string
  updatedAt: string
}
