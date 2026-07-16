import { Outlet, Link, NavLink } from 'react-router'

function Layout() {
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/blog', label: 'Blog' },
    { to: '/branches', label: 'Branches' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-neutral-900 text-white sticky top-0 z-50">
        <div className="">
          <Link to="/" className="text-xl font-bold text-white">
            Bloggy
          </Link>
          <nav className="flex gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-white font-medium'
                    : 'text-neutral-400 hover:text-white transition-colors'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
