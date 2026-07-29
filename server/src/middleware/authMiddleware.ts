import type { NextFunction, Response } from 'express'

import { getAuthCookieName } from '../config/cookies'
import type { AuthenticatedRequest } from '../types/authenticated-request'
import { HttpError } from '../utils/httpError'
import { verifyAuthToken } from '../utils/jwt'

export function authMiddleware(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction,
) {
  const cookieToken = request.cookies?.[getAuthCookieName()]
  const bearerToken = request.headers.authorization?.startsWith('Bearer ')
    ? request.headers.authorization.slice(7)
    : null

  const token = cookieToken ?? bearerToken

  if (!token) {
    next(new HttpError(401, 'Unauthorized.'))
    return
  }

  try {
    request.auth = verifyAuthToken(token)
    next()
  } catch {
    next(new HttpError(401, 'Invalid or expired authentication token.'))
  }
}