import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Button from '../ui/Button'
import Logo from '../ui/Logo'
import { logout } from '../../services/authService'

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Profile', path: '/profile' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch {
      // ignore errors; ensure user is taken to login screen
    } finally {
      setIsLoggingOut(false)
      navigate('/login')
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <NavLink to="/dashboard" className="inline-flex shrink-0">
          <Logo />
        </NavLink>

        <div className="flex flex-wrap items-center gap-2">
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
    </header>
  )
}