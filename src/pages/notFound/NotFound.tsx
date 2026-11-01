// src/pages/notFound/NotFound.tsx
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

export const NotFound = () => {
  useDocumentTitle('Página não encontrada')
  return <h1 className="text-2xl font-bold">Página não encontrada</h1>
}
