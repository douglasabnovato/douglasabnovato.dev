/** Artigo sobre os canais de web design: só com o que foi conferido nos títulos do feed público. */

import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { canaisDesign } from '@/entities/curadoria/model/curadoria.data'
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

export function CanaisWebDesign() {
  useDocumentTitle('Canais de web design')

  return (
    <article className="max-w-4xl pb-24">
      <header className="pb-8 border-b border-default">
        <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">Curadoria</span>
        <h1 className="mt-1.5 text-2xl font-medium tracking-tight text-primary">Canais de web design</h1>
        <p className="mt-3 text-sm text-secondary leading-relaxed max-w-xl">
          Uma lista de {canaisDesign.length} canais do YouTube e as tecnologias citadas nos títulos dos vídeos mais
          recentes de cada um.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-primary">Como a lista foi conferida</h2>
        <p className="mt-2 text-sm text-secondary leading-relaxed">
          Em 01/11/2026, li os títulos dos 15 vídeos mais recentes de cada canal, no feed público do YouTube, e contei
          quantos citam cada tecnologia. Os vídeos não foram assistidos, então o número mostra o tema dos títulos, não a
          qualidade do conteúdo nem tudo o que o canal ensina.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-primary">Tecnologias nos títulos</h2>
        <ul className="mt-3 divide-y divide-[var(--border-default)]">
          {canaisDesign.map((c) => (
            <li key={c.nome} className="py-3">
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors"
              >
                {c.nome} <ArrowUpRight size={12} aria-hidden="true" />
              </a>
              <p className="mt-1 text-xs text-secondary">
                {c.tecnologias.length
                  ? c.tecnologias.map(([nome, vezes]) => `${nome} (${vezes})`).join(' · ')
                  : 'Nenhuma das tecnologias procuradas aparece nos 15 títulos.'}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-primary">O que ficou de fora</h2>
        <p className="mt-2 text-sm text-secondary leading-relaxed">
          Os endereços de x.developerr e K2infocom responderam 404 em 01/11/2026 e saíram da lista.
        </p>
      </section>

      <Link to="/curadoria" className="mt-8 inline-block text-xs text-secondary hover:text-accent transition-colors">
        Voltar para a curadoria
      </Link>
    </article>
  )
}
