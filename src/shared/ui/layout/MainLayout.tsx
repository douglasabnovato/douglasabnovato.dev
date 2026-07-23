import type { ReactNode } from 'react'
import { Sidebar } from '../sidebar/Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}