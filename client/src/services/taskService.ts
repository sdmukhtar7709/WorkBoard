import { httpClient } from './httpClient'
import type { Task, TaskInput } from '../types/workboard'

interface TaskListResponse {
  success: true
  message: string
  data: {
    tasks: Task[]
  }
}

interface TaskResponse {
  success: true
  message: string
  data: {
    task: Task
  }
}

interface MessageResponse {
  success: true
  message: string
}

export async function fetchTasks() {
  const response = await httpClient.get<TaskListResponse>('/tasks')
  return response.data.data.tasks
}

export async function createTask(input: TaskInput) {
  const response = await httpClient.post<TaskResponse>('/tasks', input)
  return response.data.data.task
}

export async function updateTask(id: string, input: TaskInput) {
  const response = await httpClient.put<TaskResponse>(`/tasks/${id}`, input)
  return response.data.data.task
}

export async function deleteTask(id: string) {
  const response = await httpClient.delete<MessageResponse>(`/tasks/${id}`)
  return response.data.message
}
