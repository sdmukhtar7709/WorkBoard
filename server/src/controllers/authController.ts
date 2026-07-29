import type { Response } from 'express'

import { authCookieOptions, getAuthCookieName } from '../config/cookies'
import type { AuthenticatedRequest } from '../types/authenticated-request'
import { asyncHandler } from '../utils/asyncHandler'
import { sendSuccess } from '../utils/httpResponse'
import { HttpError } from '../utils/httpError'
import type { AuthService } from '../services/authService'

export function createAuthController(authService: AuthService) {
  return {
    register: asyncHandler(async (request, response) => {
      const session = await authService.register(request.body)

      response.cookie(getAuthCookieName(), session.token, authCookieOptions)

      sendSuccess(response, 201, 'Registration successful.', {
        user: session.user,
      })
    }),

    login: asyncHandler(async (request, response) => {
      const session = await authService.login(request.body)

      response.cookie(getAuthCookieName(), session.token, authCookieOptions)

      sendSuccess(response, 200, 'Login successful.', {
        user: session.user,
      })
    }),

    logout: asyncHandler(async (_request, response) => {
      response.clearCookie(getAuthCookieName(), {
        ...authCookieOptions,
        maxAge: undefined,
      })

      sendSuccess(response, 200, 'Logout successful.')
    }),

    me: asyncHandler(async (request: AuthenticatedRequest, response) => {
      if (!request.auth) {
        throw new HttpError(401, 'Unauthorized.')
      }

      const user = await authService.getCurrentUser(request.auth.userId)

      sendSuccess(response, 200, 'Authenticated user loaded.', {
        user,
      })
    }),
  }
}