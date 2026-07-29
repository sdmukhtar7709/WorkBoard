import { apiRequest } from './apiClient'
import type {
  AuthSuccessResponse,
  LoginPayload,
  RegisterPayload,
} from '../types/auth'

export function login(payload: LoginPayload) {
  return apiRequest<AuthSuccessResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function register(payload: RegisterPayload) {
  return apiRequest<AuthSuccessResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function logout() {
  return apiRequest<{ success: true; message: string }>('/auth/logout', {
    method: 'POST',
  })
}

export function me() {
  return apiRequest<AuthSuccessResponse>('/auth/me', {
    method: 'GET',
  })
}