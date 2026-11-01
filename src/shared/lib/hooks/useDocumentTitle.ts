import { useEffect } from 'react'

/** Sufixo comum a todos os títulos de aba. */
const SITE = 'douglasabnovato.dev'

/**
 * Define o título da aba da página atual: "Projetos · douglasabnovato.dev".
 * Sem argumento, usa só o nome do site.
 */
export function useDocumentTitle(titulo?: string) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${SITE}` : SITE
  }, [titulo])
}
