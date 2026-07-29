import 'dotenv/config'

async function main() {
  const token = process.argv[2]
  if (!token) {
    console.error('Usage: tsx simulateBrowserRequest.ts <TOKEN>')
    process.exit(1)
  }

  const res = await fetch('http://localhost:4000/api/v1/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `workboard_token=${token}`,
    },
    body: JSON.stringify({ jobTitle: 'Browser Job', jobUrl: 'https://example.com', priority: 'high', status: 'To Apply' }),
  })

  const text = await res.text()
  console.log('status', res.status)
  console.log(text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
