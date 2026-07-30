import type { CookieOptions } from 'express'

import { env } from '../config/env'

const authCookieName = 'workboard_token'

function isLocalOrigin(origin: string): boolean {
  return origin.includes('localhost') || origin.includes('127.0.0.1')
}

export function getAuthCookieName() {
  return authCookieName
}

export function getAuthCookieOptions(): CookieOptions {
  const isCrossOriginProduction = !isLocalOrigin(env.clientOrigin)

  return {
    httpOnly: true,
    sameSite: isCrossOriginProduction ? 'none' : 'lax',
    secure: isCrossOriginProduction,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24,
  }
}