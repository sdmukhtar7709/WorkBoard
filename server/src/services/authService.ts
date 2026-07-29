import type { SafeUser } from '../models/user.model'
import { toSafeUser } from '../models/user.model'
import type { UserRepository } from '../repositories/userRepository'
import { comparePassword, hashPassword } from '../utils/password'
import { HttpError } from '../utils/httpError'
import { signAuthToken } from '../utils/jwt'
import {
  validateLoginInput,
  validateRegisterInput,
  type LoginInput,
  type RegisterInput,
} from '../utils/validation'

export interface AuthSession {
  user: SafeUser
  token: string
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(input: RegisterInput): Promise<AuthSession> {
    const { username, password } = validateRegisterInput(input)

    const existingUser = await this.userRepository.findByUsername(username)

    if (existingUser) {
      throw new HttpError(409, 'Username already exists.')
    }

    const hashedPassword = await hashPassword(password)
    const createdUser = await this.userRepository.create({
      username,
      password: hashedPassword,
    })

    return {
      user: toSafeUser(createdUser),
      token: signAuthToken({
        userId: createdUser.id,
        username: createdUser.username,
      }),
    }
  }

  async login(input: LoginInput): Promise<AuthSession> {
    const { username, password } = validateLoginInput(input)
    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new HttpError(401, 'Invalid username or password.')
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      throw new HttpError(401, 'Invalid username or password.')
    }

    return {
      user: toSafeUser(user),
      token: signAuthToken({
        userId: user.id,
        username: user.username,
      }),
    }
  }

  async getCurrentUser(userId: string): Promise<SafeUser> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new HttpError(404, 'User not found.')
    }

    return toSafeUser(user)
  }
}