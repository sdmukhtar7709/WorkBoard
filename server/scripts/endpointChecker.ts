import 'dotenv/config'

const BASE = 'http://localhost:4000/api/v1'

async function request(method: string, path: string, token: string, body?: any) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = text
  }

  return { status: res.status, body: json }
}

async function main() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: tsx endpointChecker.ts <TOKEN>')
    process.exit(1)
  }

  console.log('GET /jobs')
  console.log(await request('GET', '/jobs', token))

  console.log('POST /jobs')
  const postJob = await request('POST', '/jobs', token, { jobTitle: 'CHK Job', jobUrl: 'https://example.com', priority: 'high', status: 'To Apply' })
  console.log(postJob)
  const jobId = postJob.body?.data?.job?.id

  if (jobId) {
    console.log('PUT /jobs/:id')
    console.log(await request('PUT', `/jobs/${jobId}`, token, { jobTitle: 'CHK Job Updated', jobUrl: 'https://example.com', priority: 'low', status: 'Applied' }))

    console.log('DELETE /jobs/:id')
    console.log(await request('DELETE', `/jobs/${jobId}`, token))
  }

  console.log('GET /tasks')
  console.log(await request('GET', '/tasks', token))

  console.log('POST /tasks')
  const postTask = await request('POST', '/tasks', token, { title: 'CHK Task', priority: 'high', completed: false })
  console.log(postTask)
  const taskId = postTask.body?.data?.task?.id

  if (taskId) {
    console.log('PUT /tasks/:id')
    console.log(await request('PUT', `/tasks/${taskId}`, token, { title: 'CHK Task Updated', priority: 'low', completed: true }))

    console.log('DELETE /tasks/:id')
    console.log(await request('DELETE', `/tasks/${taskId}`, token))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
