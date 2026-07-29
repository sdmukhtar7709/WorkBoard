import type { User } from '../models/user.model'

export interface CreateUserInput {
  username: string
  password: string
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  create(input: CreateUserInput): Promise<User>
}