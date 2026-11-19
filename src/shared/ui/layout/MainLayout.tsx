import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { MobileHeader } from '../mobileHeader/MobileHeader'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const botaoAbrir = useRef<HTMLButtonElement>(null)
  const conteudo = useRef<HTMLElement>(null)

  // Esc, "Fechar menu" e clique fora: o foco volta ao botão que abriu o menu.
  const fecharMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
    botaoAbrir.current?.focus()
  }, [])

  // Navegar por um link ou levar o foco para fora: fecha sem mover o foco.
  const fecharSemFoco = useCallback(() => setIsMobileMenuOpen(false), [])

  // "Pular para o conteúdo" (WCAG 2.4.1): leva o foco ao <main> sem mexer na URL do roteador.
  const pularParaConteudo = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    conteudo.current?.focus()
  }

  return (
    <div className="flex min-h-screen bg-page text-primary">
      <a href="#conteudo" onClick={pularParaConteudo} className="pular-conteudo">
        Pular para o conteúdo
      </a>
      <MobileHeader ref={botaoAbrir} isMenuOpen={isMobileMenuOpen} onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar isOpen={isMobileMenuOpen} onClose={fecharMenu} onDismiss={fecharSemFoco} />
      <main id="conteudo" ref={conteudo} tabIndex={-1} className="flex-1 p-4 pt-20 md:p-8 md:pt-8">
        {children}
      </main>
    </div>
  )
}