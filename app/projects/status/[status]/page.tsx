import { notFound } from 'next/navigation'

const ALLOWED = ['completed', 'ongoing', 'delayed']

export default function StatusPage({
  params,
}: {
  params: { status?: string }
}) {
  const status = params.status?.toLowerCase()

  if (!status || !ALLOWED.includes(status)) {
    notFound()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>STATUS OK</h1>
      <p>Normalized status: {status}</p>
    </div>
  )
}
