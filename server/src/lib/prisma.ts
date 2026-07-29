import { PrismaClient } from '@prisma/client'

import { env } from '../config/env'

declare global {
  // eslint-disable-next-line no-var
  var prismaClient: PrismaClient | undefined
}

export const prismaClient =
  global.prismaClient ??
  new PrismaClient({
    log: ['error', 'warn'],
    datasources: {
      db: {
        url: env.databaseUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient
}
// (removed temporary debug log)