import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import { env } from './config/env'
import authRoutes from './routes/authRoutes'
import jobRoutes from './routes/jobRoutes'
import taskRoutes from './routes/taskRoutes'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware'
import { requestLogger } from './middleware/requestLogger'

const app = express()

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
// temporary request logger for frontend repro debugging
app.use(requestLogger)

app.get('/api/v1/health', (_request, response) => {
  response.json({ success: true, message: 'WorkBoard API is healthy.' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/tasks', taskRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app