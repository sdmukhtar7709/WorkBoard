import { Navigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import Spinner from '../ui/Spinner'

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 px-4 text-slate-100">
        <div className="flex items-center gap-3 rounded-3xl border border-slate-800/70 bg-slate-900/90 px-6 py-5 shadow-2xl shadow-slate-950/20">
          <Spinner />
          <span className="text-sm font-medium">Verifying your session...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
