import { Outlet, Link, NavLink } from 'react-router'

function Layout() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/branches', label: 'Branches' },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-bg/90 dark:bg-[#0c0c0f]/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          <Link
            to="/"
            className="font-['Geist_Pixel'] text-2xl lowercase text-ink tracking-tight hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
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
                      ? 'bg-ink text-bg'
                      : 'text-gray-400 dark:text-gray-500 hover:text-ink dark:hover:text-gray-100'
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

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <Link
                to="/"
                className="font-['Geist_Pixel'] text-xl lowercase text-ink tracking-tight hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                bloggy
              </Link>
              <p className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.08em] text-gray-400 dark:text-gray-600 mt-2">
                thoughts, tutorials, and notes
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `font-['Geist_Mono'] text-[11px] uppercase tracking-[0.08em] transition-colors duration-200 ${
                      isActive
                        ? 'text-ink dark:text-bg'
                        : 'text-gray-400 dark:text-gray-500 hover:text-ink dark:hover:text-gray-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="font-['Geist_Mono'] text-[10px] uppercase tracking-[0.06em] text-gray-400 dark:text-gray-600">
              © {currentYear} bloggy. all rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
