import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: string
  description: string
  icon: ReactNode
}

export default function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/20">
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-3xl bg-slate-900/80 p-3 text-cyan-300">{icon}</div>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{label}</p>
      </div>
      <p className="mt-6 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  )
}
