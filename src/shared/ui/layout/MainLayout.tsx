import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { MobileHeader } from '../mobileHeader/MobileHeader'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const botaoAbrir = useRef<HTMLButtonElement>(null)

  // Esc, "Fechar menu" e clique fora: o foco volta ao botão que abriu o menu.
  const fecharMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    botaoAbrir.current?.focus()
  }, [])

  // Navegar por um link ou levar o foco para fora: fecha sem mover o foco.
  const fecharSemFoco = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <div className="flex min-h-screen bg-page text-primary">
      <MobileHeader ref={botaoAbrir} isMenuOpen={isMobileMenuOpen} onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar isOpen={isMobileMenuOpen} onClose={fecharMenu} onDismiss={fecharSemFoco} />
      <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8">{children}</main>
    </div>
  )
}