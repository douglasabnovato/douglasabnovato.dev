import { NavLink } from 'react-router-dom'
import { Home, FileText, LayoutGrid, Code2, Newspaper, Share2 } from 'lucide-react'
import { ThemeToggle } from '../themeToggle/ThemeToggle'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/curriculo', label: 'Currículo', icon: FileText, end: false },
  { to: '/projetos', label: 'Projetos', icon: LayoutGrid, end: false },
  { to: '/codigos', label: 'Códigos', icon: Code2, end: false },
  { to: '/blog', label: 'Blog', icon: Newspaper, end: false },
  { to: '/redes-sociais', label: 'Redes sociais', icon: Share2, end: false },
]

export const Sidebar = () => {
  return (
    <nav className="w-56 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-4 flex flex-col gap-6">
      <div className="px-2">
        <span className="font-bold text-lg">
          douglasabnovato<span className="text-zinc-500">.dev</span>
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-white font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </nav>
  )
}