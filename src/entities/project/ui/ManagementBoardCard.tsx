import { Lock, Globe, ArrowUpRight } from 'lucide-react'
import type { ManagementBoard } from '../model/types'

/**
 * Board privado não recebe link: o visitante receberia 404. Ele carrega o
 * método e aponta para o board público, onde o mesmo processo pode ser
 * conferido. Números só aparecem quando o visitante consegue verificá-los.
 */
export const ManagementBoardCard = ({ board }: { board: ManagementBoard }) => {
  const Icone = board.publico ? Globe : Lock

  return (
    <article className="rounded-lg border border-default bg-surface overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <img
          src={board.imagem}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full sm:w-64 shrink-0 aspect-[2/1] object-cover bg-surface-solid"
        />

        <div className="flex-1 p-5">
          <div className="flex items-center gap-1.5">
            <Icone size={12} className="text-muted shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
              {board.kicker}
            </span>
          </div>

          <h3 className="mt-2 text-base font-medium text-primary">{board.nome}</h3>

          <p className="mt-2 text-xs text-secondary leading-relaxed">{board.resumo}</p>

          {board.metodo && (
            <p className="mt-3 text-xs text-muted leading-relaxed border-l border-default pl-3">
              {board.metodo}
            </p>
          )}

          <p className="mt-3 text-[10px] font-mono text-muted">
            Visões: {board.visoes.join(' · ')}
          </p>

          {board.metricas && (
            <div className="mt-3 flex flex-wrap gap-x-5">
              {board.metricas.map((m) => (
                <span key={m.label} className="text-xs text-secondary">
                  <span className="font-mono tabular-nums text-primary">{m.value}</span>{' '}
                  <span className="text-muted">{m.label}</span>
                </span>
              ))}
            </div>
          )}

          {board.ponte && (
            <p className="mt-3 text-[11px] text-muted italic">{board.ponte}</p>
          )}

          {(board.url || board.repoUrl || board.issuesUrl) && (
            <div className="mt-4 pt-3 border-t border-default flex flex-wrap gap-x-4 gap-y-2">
              {board.url && (
                <a href={board.url} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline">
                  Board <ArrowUpRight size={11} />
                </a>
              )}
              {board.repoUrl && (
                <a href={board.repoUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-accent transition-colors">
                  Repositório <ArrowUpRight size={11} />
                </a>
              )}
              {board.issuesUrl && (
                <a href={board.issuesUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-accent transition-colors">
                  Issues <ArrowUpRight size={11} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}