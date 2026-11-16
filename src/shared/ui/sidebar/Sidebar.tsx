import { useEffect, useRef, type FocusEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen, Home, FileText, LayoutGrid, Lightbulb, Newspaper, X } from 'lucide-react'
import { ThemeToggle } from '../themeToggle/ThemeToggle'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/projetos', label: 'Projetos', icon: LayoutGrid, end: false },
  { to: '/blog', label: 'Blog', icon: Newspaper, end: false }, 
  { to: '/curadoria', label: 'Curadoria', icon: BookOpen, end: false },
  { to: '/ideias', label: 'Ideias', icon: Lightbulb, end: false },
  { to: '/curriculo', label: 'Currículo', icon: FileText, end: false },
]

interface SidebarProps {
  isOpen: boolean
  /** Fecha e devolve o foco ao botão "Abrir menu" (Esc, "Fechar menu", clique fora). */
  onClose: () => void
  /** Fecha sem mover o foco (link escolhido ou foco que saiu do menu). */
  onDismiss: () => void
}

export const Sidebar = ({ isOpen, onClose, onDismiss }: SidebarProps) => {
  const botaoFechar = useRef<HTMLButtonElement>(null)

  // Menu do celular aberto: o foco vai para "Fechar menu", e o Esc fecha.
  useEffect(() => {
    if (!isOpen) return
    botaoFechar.current?.focus()
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', aoTeclar)
    return () => document.removeEventListener('keydown', aoTeclar)
  }, [isOpen, onClose])

  // Com o menu aberto, o Tab que sai dele fecha o menu, para o foco não ficar atrás do fundo escuro.
  const aoSairDoFoco = (e: FocusEvent<HTMLElement>) => {
    if (isOpen && e.relatedTarget instanceof Node && !e.currentTarget.contains(e.relatedTarget)) onDismiss()
  }

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="md:hidden fixed inset-0 bg-black/60 z-40" aria-hidden="true" />
      )}

      <nav
        id="menu-principal"
        aria-label="Menu principal"
        onBlur={aoSairDoFoco}
        data-aberto={isOpen || undefined}
        className={`fixed md:static top-0 left-0 h-screen md:h-auto w-56 flex-shrink-0 border-r border-default bg-surface-solid md:bg-surface p-4 flex flex-col gap-6 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 max-md:invisible'
          }`}
      >
        <div className="flex items-center justify-between px-2">
          <span className="font-bold text-lg">
            douglasabnovato<span className="text-muted">.dev</span>
          </span>
          <button ref={botaoFechar} onClick={onClose} aria-label="Fechar menu" className="md:hidden text-secondary hover:text-primary">
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onDismiss}
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