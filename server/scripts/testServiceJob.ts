import 'dotenv/config'

import { prismaClient } from '../src/lib/prisma'
import { PrismaJobRepository } from '../src/repositories/prisma/job.repository'
import { JobService } from '../src/services/jobService'

async function main() {
  const user = await prismaClient.user.findUnique({ where: { username: 'e2e_test_user' } })
  if (!user) {
    console.error('test user not found')
    process.exit(1)
  }

  const repo = new PrismaJobRepository(prismaClient)
  const service = new JobService(repo)

  const job = await service.create({ userId: user.id, jobTitle: 'Svc Job', jobUrl: 'https://example.com', priority: 'high', status: 'To Apply' })
  console.log('created job via service', job)

  const list = await service.list(user.id)
  console.log('jobs for user', list.length)

  // cleanup
  await repo.delete(job.id)
  console.log('deleted job')

  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
