import { useCallback, useRef, useState, type ReactNode } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { MobileHeader } from '../mobileHeader/MobileHeader'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const botaoAbrir = useRef<HTMLButtonElement>(null)

  // Ao fechar o menu do celular, o foco volta ao botão que o abriu.
  const fecharMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    botaoAbrir.current?.focus()
  }, [])

  return (
    <div className="flex min-h-screen bg-page text-primary">
      <MobileHeader ref={botaoAbrir} isMenuOpen={isMobileMenuOpen} onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar isOpen={isMobileMenuOpen} onClose={fecharMenu} />
      <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8">{children}</main>
    </div>
  )
}