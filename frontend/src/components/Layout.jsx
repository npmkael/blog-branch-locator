import { Outlet, Link, NavLink } from 'react-router'

function Layout() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/branches', label: 'Branches' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#0c0c0f]/90 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="font-['Geist_Pixel'] text-2xl lowercase text-zinc-900 dark:text-zinc-100 tracking-tight hover:text-black dark:hover:text-white transition-colors duration-200"
          >
            bloggy
          </Link>

          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-[6px] transition-all duration-200 ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                      : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
