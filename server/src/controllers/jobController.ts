import type { Response } from 'express'

import type { AuthenticatedRequest } from '../types/authenticated-request'
import { asyncHandler } from '../utils/asyncHandler'
import { HttpError } from '../utils/httpError'
import { sendSuccess } from '../utils/httpResponse'
import type { JobService } from '../services/jobService'

function getId(paramsId: string | string[] | undefined): string {
  if (typeof paramsId === 'string' && paramsId.trim()) {
    return paramsId
  }

  throw new HttpError(400, 'Invalid job id.')
}

export function createJobController(jobService: JobService) {
  return {
    list: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const jobs = await jobService.list(request.auth.userId)
      sendSuccess(response, 200, 'Jobs loaded.', { jobs })
    }),

    getById: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const job = await jobService.getById(getId(request.params.id), request.auth.userId)
      sendSuccess(response, 200, 'Job loaded.', { job })
    }),

    create: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const job = await jobService.create({
        userId: request.auth.userId,
        jobTitle: request.body?.jobTitle,
        jobUrl: request.body?.jobUrl,
        priority: request.body?.priority,
        status: request.body?.status,
      })

      sendSuccess(response, 201, 'Job created.', { job })
    }),

    update: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const job = await jobService.update(getId(request.params.id), request.auth.userId, {
        jobTitle: request.body?.jobTitle,
        jobUrl: request.body?.jobUrl,
        priority: request.body?.priority,
        status: request.body?.status,
      })

      sendSuccess(response, 200, 'Job updated.', { job })
    }),

    remove: asyncHandler(async (request: AuthenticatedRequest, response: Response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      await jobService.remove(getId(request.params.id), request.auth.userId)
      sendSuccess(response, 200, 'Job deleted.')
    }),
  }
}
