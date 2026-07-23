import { useState, type ReactNode } from 'react'
import { Sidebar } from '../sidebar/Sidebar'
import { MobileHeader } from '../mobileHeader/MobileHeader'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-page text-primary">
      <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <main className="flex-1 p-4 pt-20 md:p-8 md:pt-8">{children}</main>
    </div>
  )
}