import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MainLayout } from '@/shared/ui/layout/MainLayout'
import { iniciarMedicao, registrarPagina } from '@/shared/lib/medicao'
import { AppRouter } from './router/AppRouter'

function App() {
  const { pathname } = useLocation()

  // A primeira página é contada quando o script termina de carregar.
  useEffect(() => {
    if (!iniciarMedicao()) registrarPagina(pathname)
  }, [pathname])

  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  )
}

export default App
