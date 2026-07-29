import 'dotenv/config'

const BASE = 'http://localhost:4000/api/v1'

async function main() {
  const token = process.argv[2]
  const jobId = process.argv[3]
  if (!token || !jobId) {
    console.error('Usage: tsx getJobAsUser.ts <TOKEN> <JOB_ID>')
    process.exit(1)
  }

  const res = await fetch(`${BASE}/jobs/${jobId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })

  const text = await res.text()
  console.log('status', res.status)
  console.log(text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
