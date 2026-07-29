import type { Request } from 'express'

import type { AuthTokenPayload } from '../utils/jwt'

export interface AuthenticatedRequest extends Request {
  auth?: AuthTokenPayload
}