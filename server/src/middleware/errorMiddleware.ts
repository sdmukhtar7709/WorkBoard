import type { NextFunction, Request, Response } from 'express'

import { HttpError } from '../utils/httpError'

export function notFoundHandler(
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  response.status(404).json({
    success: false,
    message: 'Route not found.',
  })
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof HttpError) {
    response.status(error.statusCode).json({
      success: false,
      message: error.message,
    })

    return
  }

  console.error(error)
  try {
    // use sync require to avoid top-level await in build
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs')
    const stack = (error as Error).stack ?? String(error)
    fs.appendFileSync('server_error.log', `[${new Date().toISOString()}]\n${stack}\n\n`)
  } catch {
    // ignore logging errors
  }

  response.status(500).json({
    success: false,
    message: 'Internal server error.',
  })
}