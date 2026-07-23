import { NavLink } from 'react-router-dom'
import { Home, FileText, LayoutGrid, Code2, Newspaper, Share2, X } from 'lucide-react'
import { ThemeToggle } from '../themeToggle/ThemeToggle'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/curriculo', label: 'Currículo', icon: FileText, end: false },
  { to: '/projetos', label: 'Projetos', icon: LayoutGrid, end: false },
  { to: '/codigos', label: 'Códigos', icon: Code2, end: false },
  { to: '/blog', label: 'Blog', icon: Newspaper, end: false },
  { to: '/redes-sociais', label: 'Redes sociais', icon: Share2, end: false },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="md:hidden fixed inset-0 bg-black/60 z-40" aria-hidden="true" />
      )}

      <nav
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-56 flex-shrink-0 border-r border-default bg-surface-solid md:bg-surface p-4 flex flex-col gap-6 z-50 transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="flex items-center justify-between px-2">
          <span className="font-bold text-lg">
            douglasabnovato<span className="text-muted">.dev</span>
          </span>
          <button onClick={onClose} aria-label="Fechar menu" className="md:hidden text-secondary hover:text-primary">
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
                    ? 'bg-surface-solid text-primary font-medium'
                    : 'text-secondary hover:text-primary hover:bg-surface-solid/60'
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
    </>
  )
}