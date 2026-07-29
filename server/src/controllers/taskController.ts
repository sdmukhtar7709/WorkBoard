import type { Response } from 'express'

import type { AuthenticatedRequest } from '../types/authenticated-request'
import { asyncHandler } from '../utils/asyncHandler'
import { HttpError } from '../utils/httpError'
import { sendSuccess } from '../utils/httpResponse'
import type { TaskService } from '../services/taskService'

function getId(paramsId: string | string[] | undefined): string {
  if (typeof paramsId === 'string' && paramsId.trim()) {
    return paramsId
  }

  throw new HttpError(400, 'Invalid task id.')
}

export function createTaskController(taskService: TaskService) {
  return {
    list: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const tasks = await taskService.list(request.auth.userId)
      sendSuccess(response, 200, 'Tasks loaded.', { tasks })
    }),

    getById: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const task = await taskService.getById(getId(request.params.id), request.auth.userId)
      sendSuccess(response, 200, 'Task loaded.', { task })
    }),

    create: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const task = await taskService.create({
        userId: request.auth.userId,
        title: request.body?.title,
        priority: request.body?.priority,
        completed: request.body?.completed,
      })

      sendSuccess(response, 201, 'Task created.', { task })
    }),

    update: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const task = await taskService.update(getId(request.params.id), request.auth.userId, {
        title: request.body?.title,
        priority: request.body?.priority,
        completed: request.body?.completed,
      })

      sendSuccess(response, 200, 'Task updated.', { task })
    }),

    remove: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      await taskService.remove(getId(request.params.id), request.auth.userId)
      sendSuccess(response, 200, 'Task deleted.')
    }),
  }
}
