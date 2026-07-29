import 'dotenv/config'

import { prismaClient } from '../src/lib/prisma'
import { hashPassword } from '../src/utils/password'
import { signAuthToken } from '../src/utils/jwt'

async function main() {
  const username = process.argv[2] ?? 'e2e_test_user'
  const password = process.argv[3] ?? 'Password123!'

  const hashed = await hashPassword(password)

  // create or upsert user
  const existing = await prismaClient.user.findUnique({ where: { username } })
  if (existing) {
    console.log('user already exists:', existing.id)
    const token = signAuthToken({ userId: existing.id, username: existing.username })
    console.log('token', token)
    process.exit(0)
  }

  const user = await prismaClient.user.create({
    data: {
      username,
      password: hashed,
    },
  })

  console.log('created user', user.id)

  const token = signAuthToken({ userId: user.id, username: user.username })
  console.log('token', token)

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
