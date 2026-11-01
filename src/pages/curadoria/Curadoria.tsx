/**
 * Listagem por temas do que está em estudo e das ideias de projetos. A mesma
 * página atende /curadoria e /ideias; o que muda é o conjunto de itens.
 */

import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import {
  canaisDesign,
  curadoria,
  ideias,
  ISSUE_CANAIS,
  REPO_ISSUES,
  type ItemCuradoria,
  type StatusItem,
} from '@/entities/curadoria/model/curadoria.data'
import { useDocumentTitle } from '@/shared/lib/hooks/useDocumentTitle'

const STATUS_LABEL: Record<StatusItem, string> = {
  'a explorar': 'A explorar',
  registro: 'Registro',
  ideia: 'Ideia',
}

const COPY = {
  curadoria: {
    titulo: 'Curadoria',
    subtitulo: 'O que quero estudar e acompanhar',
    intro:
      'Plataformas, formações, oportunidades e eventos, separados por tema. Estar nesta lista não significa curso concluído: "A explorar" ainda não foi feito, e "Registro" é uma anotação datada, que pode estar encerrada.',
  },
  ideias: {
    titulo: 'Ideias',
    subtitulo: 'Projetos que ainda não existem',
    intro:
      'Banco de ideias para praticar e criar projetos. Nenhum item aqui é um projeto entregue nem um cliente atendido.',
  },
} as const

const Item = ({ item }: { item: ItemCuradoria }) => (
  <li id={`issue-${item.issue}`} className="scroll-mt-20 border-b border-default py-3 last:border-b-0">
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <h3 className="text-sm font-medium text-primary">
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-accent transition-colors"
          >
            {item.titulo} <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        ) : (
          item.titulo
        )}
      </h3>
      <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-muted">
        {STATUS_LABEL[item.status]}
      </span>
    </div>
    <p className="mt-1 text-xs leading-relaxed text-secondary">{item.resumo}</p>
    <a
      href={`${REPO_ISSUES}/${item.issue}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 inline-block text-[10px] font-mono text-muted hover:text-accent transition-colors"
    >
      issue #{item.issue}
    </a>
  </li>
)

export const Curadoria = ({ tipo }: { tipo: 'curadoria' | 'ideias' }) => {
  const copy = COPY[tipo]
  useDocumentTitle(copy.titulo)
  const itens = tipo === 'curadoria' ? curadoria : ideias
  const [tema, setTema] = useState('Todos')

  const temas = useMemo(() => [...new Set(itens.map((i) => i.tema))], [itens])
  const grupos = temas
    .filter((t) => tema === 'Todos' || t === tema)
    .map((t) => ({ tema: t, itens: itens.filter((i) => i.tema === t) }))
  const mostrarCanais = tipo === 'curadoria' && tema === 'Todos'

  return (
    <div className="max-w-4xl pb-24">
      <header className="pb-8 border-b border-default">
        <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
          {copy.titulo}
        </span>
        <h1 className="mt-1.5 text-2xl font-medium tracking-tight text-primary">{copy.subtitulo}</h1>
        <p className="mt-3 text-sm text-secondary leading-relaxed max-w-xl">{copy.intro}</p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tema">
        {['Todos', ...temas].map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tema === t}
            onClick={() => setTema(t)}
            className={`rounded-md border border-default px-2.5 py-1 text-xs transition-colors ${
              tema === t ? 'bg-surface-solid text-primary font-medium' : 'text-secondary hover:text-primary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {grupos.map((g) => (
        <section key={g.tema} className="mt-8">
          <h2 className="pb-2 border-b border-default text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
            {g.tema} <span className="text-muted tabular-nums">· {g.itens.length}</span>
          </h2>
          <ul>
            {g.itens.map((item) => (
              <Item key={item.issue} item={item} />
            ))}
          </ul>
        </section>
      ))}

      {mostrarCanais && (
        <section id={`issue-${ISSUE_CANAIS}`} className="mt-8 scroll-mt-20">
          <h2 className="pb-2 border-b border-default text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
            Canais de web design <span className="text-muted tabular-nums">· {canaisDesign.length}</span>
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {canaisDesign.map((c) => (
              <li key={c.nome}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-accent transition-colors"
                >
                  {c.nome} <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`${REPO_ISSUES}/${ISSUE_CANAIS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[10px] font-mono text-muted hover:text-accent transition-colors"
          >
            issue #{ISSUE_CANAIS}
          </a>
        </section>
      )}
    </div>
  )
}
