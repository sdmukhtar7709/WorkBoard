import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Categories', path: '/categories' },
  { label: 'Profile', path: '/profile' },
]

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <NavLink
          to="/"
          end
          className="text-lg font-semibold tracking-tight text-white"
        >
          WorkBoard
        </NavLink>

        <div className="flex flex-wrap gap-2">
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
        </div>
      </nav>
    </header>
  )
}