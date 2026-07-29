export interface User {
  id: string
  username: string
  password: string
  createdAt: string
  updatedAt: string
}

export type SafeUser = Omit<User, 'password'>

export function toSafeUser(user: User): SafeUser {
  const { password, ...safeUser } = user

  return safeUser
}