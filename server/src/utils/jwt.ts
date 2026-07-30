import jwt from 'jsonwebtoken'

import { env } from '../config/env'

const jwtAlgorithm: jwt.Algorithm = 'HS256'

export interface AuthTokenPayload {
  userId: string
  username: string
}

export function signAuthToken(payload: AuthTokenPayload): string {
  const expiresIn = env.jwtExpiresIn as jwt.SignOptions['expiresIn']

  return jwt.sign(payload, env.jwtSecret, {
    algorithm: jwtAlgorithm,
    expiresIn,
  })
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, env.jwtSecret, {
    algorithms: [jwtAlgorithm],
  }) as AuthTokenPayload
}
