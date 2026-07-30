import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { logout } from '../../services/authService'

const navItems = [{ label: 'Dashboard', path: '/dashboard' }]

export default function Navbar() {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch {
      // ignore errors; ensure user is taken to login screen
    } finally {
      setIsLoggingOut(false)
      setIsMobileOpen(false)
      navigate('/login')
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/dashboard" className="inline-flex shrink-0">
            <Logo />
          </NavLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 p-3 text-slate-200 transition hover:border-cyan-400 xl:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-navigation"
            aria-label="Open mobile menu"
            onClick={() => setIsMobileOpen((current) => !current)}
          >
            <span className="sr-only">Open mobile menu</span>
            <span className="flex h-5 w-5 flex-col justify-between gap-1">
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-full rounded-full bg-current" />
              <span className="block h-0.5 w-2/3 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Button
            variant="secondary"
            className="rounded-full px-4 py-2 text-sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={
          'overflow-hidden border-t border-slate-800/80 bg-slate-950/95 transition-all duration-300 xl:hidden ' +
          (isMobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <div className="space-y-3 px-4 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                [
                  'block rounded-2xl border px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            className="w-full rounded-2xl border border-rose-500 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-400"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? 'Signing out...' : 'Logout'}
          </button>
        </div>
      </div>
    </header>
  )
}