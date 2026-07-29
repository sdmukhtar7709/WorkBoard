import type { Request, Response, NextFunction } from 'express'

// Simple debug logger for incoming requests to jobs/tasks during frontend repro
export function requestLogger(request: Request, _response: Response, next: NextFunction) {
  try {
    const { method, originalUrl, headers, body } = request
    const entry = `[${new Date().toISOString()}] ${method} ${originalUrl}\nHEADERS: ${JSON.stringify(headers)}\nBODY: ${JSON.stringify(body)}\n\n`
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require('fs')
    fs.appendFileSync('request_debug.log', entry)
  } catch {
    // ignore logging errors
  }

  next()
}
