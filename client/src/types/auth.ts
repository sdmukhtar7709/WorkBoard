export interface AuthUser {
  id: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface AuthSuccessResponse {
  success: true
  message: string
  data: {
    user: AuthUser
  }
}

export interface ApiErrorResponse {
  success: false
  message: string
  error?: string | string[]
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  confirmPassword: string
}