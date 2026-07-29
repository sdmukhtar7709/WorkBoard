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

  const json = await res.json().catch(() => null)
  return { status: res.status, body: json }
}

async function main() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: tsx validationChecker.ts <TOKEN>')
    process.exit(1)
  }

  console.log('POST /jobs with empty body')
  console.log(await request('POST', '/jobs', token, {}))

  console.log('POST /tasks with empty body')
  console.log(await request('POST', '/tasks', token, {}))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
