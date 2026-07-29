import type { PropsWithChildren } from 'react'

type ModalProps = PropsWithChildren<{
  title: string
  open: boolean
  onClose: () => void
}>

export default function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-slate-950/50 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
          <button
            className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}