import 'dotenv/config'

const BASE = 'http://localhost:4000/api/v1'

async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  const data = await res.json().catch(() => null)
  if (!res.ok) throw { status: res.status, data }
  return data
}

async function run() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: node e2eJobsTasks.ts <JWT_TOKEN>')
    process.exit(1)
  }

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  console.log('Creating job...')
  const createJob = await api('/jobs', {
    method: 'POST',
    headers,
    body: JSON.stringify({ jobTitle: 'E2E Job', jobUrl: 'https://example.com/e2e', priority: 'high', status: 'To Apply' }),
  })
  console.log('createJob response:', JSON.stringify(createJob))
  const createdJob = createJob.data.job
  console.log('Created job id:', createdJob.id)

  console.log('Listing jobs...')
  const listJobs = await api('/jobs', { method: 'GET', headers })
  console.log('Jobs count:', listJobs.data.jobs.length)

  const jobId = createdJob.id

  console.log('Updating job...')
  await api(`/jobs/${jobId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ jobTitle: 'E2E Job Updated', jobUrl: 'https://example.com/e2e-updated', priority: 'low', status: 'Applied' }),
  })
  console.log('Updated job')

  console.log('Creating task...')
  const createTask = await api('/tasks', {
    method: 'POST',
    headers,
    body: JSON.stringify({ title: 'E2E Task', priority: 'high', completed: false }),
  })
  const createdTask = createTask.data.task
  console.log('Created task id:', createdTask.id)

  console.log('Listing tasks...')
  const listTasks = await api('/tasks', { method: 'GET', headers })
  console.log('Tasks count:', listTasks.data.tasks.length)

  const taskId = createdTask.id

  console.log('Toggling task complete...')
  await api(`/tasks/${taskId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ title: 'E2E Task', priority: 'high', completed: true }),
  })
  console.log('Toggled task')

  console.log('Cleaning up: deleting task and job')
  await api(`/tasks/${taskId}`, { method: 'DELETE', headers })
  await api(`/jobs/${jobId}`, { method: 'DELETE', headers })
  console.log('Cleanup done')
}

run().catch((err) => {
  console.error(err.response?.data ?? err.message)
  process.exit(1)
})
