import 'dotenv/config'

const BASE = 'http://localhost:4000/api/v1'

async function main() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: tsx testCreateJob.ts <TOKEN>')
    process.exit(1)
  }

  const res = await fetch(`${BASE}/jobs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle: 'TMP Job', jobUrl: 'https://example.com', priority: 'high', status: 'To Apply' }),
  })

  const text = await res.text()
  console.log('status', res.status)
  console.log('body', text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
