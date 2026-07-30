import axios from 'axios'

import type { ApiErrorResponse } from '../types/api'
import { apiBaseUrl } from './apiClient'

export const httpClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
})

export function getApiErrorMessage(error: unknown, fallback = 'Request failed.') {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallback
  }

  return fallback
}
