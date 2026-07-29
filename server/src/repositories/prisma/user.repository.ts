import type { PrismaClient, User as PrismaUser } from '@prisma/client'

import type { User } from '../../models/user.model'
import { normalizeUsername } from '../../utils/validation'
import type { CreateUserInput, UserRepository } from '../userRepository'

function mapUser(user: PrismaUser): User {
  return {
    id: user.id,
    username: user.username,
    password: user.password,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }
}

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } })

    return user ? mapUser(user) : null
  }

  async findByUsername(username: string): Promise<User | null> {
    const normalizedUsername = normalizeUsername(username)
    const user = await this.prisma.user.findUnique({
      where: { username: normalizedUsername },
    })

    return user ? mapUser(user) : null
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username: normalizeUsername(input.username),
        password: input.password,
      },
    })

    return mapUser(user)
  }
}