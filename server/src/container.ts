import { prismaClient } from './lib/prisma'
import { createAuthController } from './controllers/authController'
import { createJobController } from './controllers/jobController'
import { createTaskController } from './controllers/taskController'
import { AuthService } from './services/authService'
import { PrismaUserRepository } from './repositories/prisma/user.repository'
import { PrismaJobRepository } from './repositories/prisma/job.repository'
import { PrismaTaskRepository } from './repositories/prisma/task.repository'
import { JobService } from './services/jobService'
import { TaskService } from './services/taskService'

const userRepository = new PrismaUserRepository(prismaClient)
const authService = new AuthService(userRepository)
const jobRepository = new PrismaJobRepository(prismaClient)
const taskRepository = new PrismaTaskRepository(prismaClient)
const jobService = new JobService(jobRepository, userRepository)
const taskService = new TaskService(taskRepository, userRepository)

export const authController = createAuthController(authService)
export const jobController = createJobController(jobService)
export const taskController = createTaskController(taskService)
export { authService, userRepository, jobService, taskService, jobRepository, taskRepository }