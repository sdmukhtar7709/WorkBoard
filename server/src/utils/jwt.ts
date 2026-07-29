import jwt from 'jsonwebtoken'

import { env } from '../config/env'

export interface AuthTokenPayload {
  userId: string
  username: string
}

export function signAuthToken(payload: AuthTokenPayload): string {
  const expiresIn = env.jwtExpiresIn as jwt.SignOptions['expiresIn']

  return jwt.sign(payload, env.jwtSecret, {
    expiresIn,
  })
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.jwtSecret) as AuthTokenPayload
}