import type { ApiErrorResponse } from '../types/auth'

export class ApiError extends Error {
  status: number
  details?: ApiErrorResponse

  constructor(message: string, status: number, details?: ApiErrorResponse) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

const apiBaseUrl = '/api/v1'

async function readResponseBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => null)
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  const body = await readResponseBody(response)

  if (!response.ok) {
    const errorBody = body as ApiErrorResponse | null

    throw new ApiError(
      errorBody?.message ?? 'Request failed',
      response.status,
      errorBody ?? undefined,
    )
  }

  return body as T
}