import { MainLayout } from '@/shared/ui/layout/MainLayout'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  )
}

export default App