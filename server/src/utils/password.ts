import bcrypt from 'bcrypt'

import { env } from '../config/env'

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, env.bcryptRounds)
}

export function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}