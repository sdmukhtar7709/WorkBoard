import type { CookieOptions } from 'express'

import { env } from '../config/env'

const authCookieName = 'workboard_token'

export function getAuthCookieName() {
  return authCookieName
}

export function getAuthCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24,
  }
}