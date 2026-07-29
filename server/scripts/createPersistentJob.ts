import 'dotenv/config'

const BASE = 'http://localhost:4000/api/v1'

async function main() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: tsx createPersistentJob.ts <TOKEN>')
    process.exit(1)
  }

  const res = await fetch(`${BASE}/jobs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle: 'Persistent Job', jobUrl: 'https://example.com/persist', priority: 'high', status: 'To Apply' }),
  })

  const data = await res.json()
  console.log('status', res.status)
  console.log(JSON.stringify(data))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
