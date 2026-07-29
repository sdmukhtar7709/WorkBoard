import { HttpError } from './httpError'

function getTrimmedString(value: unknown): string {
  if (typeof value !== 'string') {
    throw new HttpError(400, 'Request body must contain valid strings.')
  }

  return value.trim()
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase()
}

export function normalizeCategoryName(name: string): string {
  return name.trim()
}

function normalizePriority(value: string): 'high' | 'low' {
  const normalized = value.trim().toLowerCase()

  if (normalized !== 'high' && normalized !== 'low') {
    throw new HttpError(400, 'Priority must be either high or low.')
  }

  return normalized
}

function normalizeJobStatus(value: string): 'To Apply' | 'Applied' {
  const normalized = value.trim()

  if (normalized !== 'To Apply' && normalized !== 'Applied') {
    throw new HttpError(400, 'Status must be either To Apply or Applied.')
  }

  return normalized
}

function validateUsername(username: string): string {
  const normalizedUsername = normalizeUsername(username)

  if (normalizedUsername.length < 3) {
    throw new HttpError(400, 'Username must be at least 3 characters long.')
  }

  if (normalizedUsername.length > 30) {
    throw new HttpError(400, 'Username must be 30 characters or less.')
  }

  return normalizedUsername
}

function validatePassword(password: string): string {
  if (password.length < 8) {
    throw new HttpError(400, 'Password must be at least 8 characters long.')
  }

  if (password.length > 72) {
    throw new HttpError(400, 'Password must be 72 characters or less.')
  }

  return password
}

export interface LoginInput {
  username: string
  password: string
}

export interface RegisterInput extends LoginInput {
  confirmPassword: string
}

export interface CategoryInput {
  name: string
  userId: string
}

export interface CategoryUpdateInput {
  name: string
}

export function validateLoginInput(body: unknown): LoginInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>
  const username = validateUsername(getTrimmedString(record.username))
  const password = validatePassword(getTrimmedString(record.password))

  return { username, password }
}

export function validateRegisterInput(body: unknown): RegisterInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>
  const username = validateUsername(getTrimmedString(record.username))
  const password = validatePassword(getTrimmedString(record.password))
  const confirmPassword = getTrimmedString(record.confirmPassword)

  if (password !== confirmPassword) {
    throw new HttpError(400, 'Passwords do not match.')
  }

  return { username, password, confirmPassword }
}

export function validateCategoryInput(body: unknown): CategoryInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>
  const userId = getTrimmedString(record.userId)
  const name = normalizeCategoryName(getTrimmedString(record.name))

  if (name.length < 2) {
    throw new HttpError(400, 'Category name must be at least 2 characters long.')
  }

  if (name.length > 50) {
    throw new HttpError(400, 'Category name must be 50 characters or less.')
  }

  return { name, userId }
}

export function validateCategoryUpdateInput(body: unknown): CategoryUpdateInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>
  const name = normalizeCategoryName(getTrimmedString(record.name))

  if (name.length < 2) {
    throw new HttpError(400, 'Category name must be at least 2 characters long.')
  }

  if (name.length > 50) {
    throw new HttpError(400, 'Category name must be 50 characters or less.')
  }

  return { name }
}

export interface JobInput {
  jobTitle: string
  jobUrl: string
  priority: 'high' | 'low'
  status: 'To Apply' | 'Applied'
}

export interface JobUpdateInput extends JobInput {}

export interface TaskInput {
  title: string
  priority: 'high' | 'low'
  completed: boolean
}

export interface TaskUpdateInput extends TaskInput {}

function validateText(value: unknown, fieldName: string, min = 2, max = 120): string {
  const text = getTrimmedString(value)

  if (text.length < min) {
    throw new HttpError(400, `${fieldName} must be at least ${min} characters long.`)
  }

  if (text.length > max) {
    throw new HttpError(400, `${fieldName} must be ${max} characters or less.`)
  }

  return text
}

function validateJobUrl(url: unknown): string {
  const text = getTrimmedString(url)

  try {
    const parsed = new URL(text)

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error('Invalid protocol')
    }

    return parsed.toString()
  } catch {
    throw new HttpError(400, 'Job URL must be a valid http or https URL.')
  }
}

function parseBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (normalized === 'true') {
      return true
    }

    if (normalized === 'false') {
      return false
    }
  }

  throw new HttpError(400, `${fieldName} must be a boolean.`)
}

export function validateJobInput(body: unknown): JobInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>

  return {
    jobTitle: validateText(record.jobTitle, 'Job title'),
    jobUrl: validateJobUrl(record.jobUrl),
    priority: normalizePriority(getTrimmedString(record.priority)),
    status: normalizeJobStatus(getTrimmedString(record.status)),
  }
}

export function validateJobUpdateInput(body: unknown): JobUpdateInput {
  return validateJobInput(body)
}

export function validateTaskInput(body: unknown): TaskInput {
  if (typeof body !== 'object' || body === null) {
    throw new HttpError(400, 'Invalid request body.')
  }

  const record = body as Record<string, unknown>

  return {
    title: validateText(record.title, 'Task title'),
    priority: normalizePriority(getTrimmedString(record.priority)),
    completed: parseBoolean(record.completed ?? false, 'Completed'),
  }
}

export function validateTaskUpdateInput(body: unknown): TaskUpdateInput {
  return validateTaskInput(body)
}