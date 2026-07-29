import { Outlet } from 'react-router-dom'

import Logo from '../ui/Logo'
import Card from '../ui/Card'

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <Card className="mx-auto max-w-md">
          <div className="mb-8 space-y-2 text-center">
            <div className="flex justify-center">
              <Logo />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-sm text-slate-400">
              Sign in or create an account to continue.
            </p>
          </div>

          <Outlet />
        </Card>
      </div>
    </main>
  )
}