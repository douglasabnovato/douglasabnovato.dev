import { ArrowUpRight, Pin } from 'lucide-react'
import type { GistExibido } from '../model/useGithubExtras'

const relativo = (iso: string | null) => {
  if (!iso) return null
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000)
  if (dias <= 0) return 'hoje'
  if (dias === 1) return 'ontem'
  if (dias < 30) return `há ${dias} dias`
  const meses = Math.floor(dias / 30)
  if (meses < 12) return meses === 1 ? 'há 1 mês' : `há ${meses} meses`
  const anos = Math.floor(meses / 12)
  return anos === 1 ? 'há 1 ano' : `há ${anos} anos`
}

/** Cartão compacto — menor que o de projeto, sem imagem. */
export const GistCard = ({ gist }: { gist: GistExibido }) => {
  const meta = [
    gist.linguagem,
    gist.arquivos > 1 ? `${gist.arquivos} arquivos` : null,
    gist.comentarios > 0 ? `${gist.comentarios} comentários` : null,
    relativo(gist.atualizadoEm),
  ].filter(Boolean)

  return (
    <a
      href={gist.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-md border border-default bg-surface p-3 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-mono text-primary truncate group-hover:text-accent transition-colors">
          {gist.arquivo}
        </span>
        {gist.fixado ? (
          <Pin size={11} className="text-accent shrink-0 mt-0.5" />
        ) : (
          <ArrowUpRight
            size={11}
            className="text-muted shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      {gist.descricao && (
        <p className="mt-1.5 text-[11px] text-secondary leading-snug line-clamp-2">
          {gist.descricao}
        </p>
      )}

      {meta.length > 0 && (
        <p className="mt-auto pt-2 text-[10px] font-mono text-muted tabular-nums truncate">
          {meta.join(' · ')}
        </p>
      )}
    </a>
  )
}