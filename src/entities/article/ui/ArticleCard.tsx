import type { Article } from '../model/types'
import { Calendar, Heart, ExternalLink, Tag } from 'lucide-react'

interface ArticleCardProps {
  article: Article & {
    thumbnail?: string
    categories?: string[]
    claps?: number
    readTime?: string
  }
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = new Date(article.pubDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-surface border border-default rounded-xl overflow-hidden flex flex-col justify-between hover:border-accent transition-all duration-300"
    >
      {/* Filete lateral de destaque no hover */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity rounded-l" />

      <div>
        {/* Imagem de Capa / Thumbnail (se disponível) */}
        {article.thumbnail && (
          <div className="relative w-full h-36 overflow-hidden bg-surface-solid border-b border-default">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-5">
          {/* Tags ou Categorias */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {article.categories.slice(0, 2).map((cat, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-surface-solid border border-default text-accent"
                >
                  <Tag size={10} /> {cat}
                </span>
              ))}
            </div>
          )}

          {/* Título do Artigo */}
          <h2 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-relaxed mb-2">
            {article.title}
          </h2>

          {/* Descrição / Resumo */}
          <p className="text-xs text-secondary line-clamp-2 leading-relaxed mb-4">
            {article.description}
          </p>
        </div>
      </div>

      {/* Rodapé do Card com Metadados (Data, Aplausos e Link) */}
      <div className="px-5 pb-5 pt-3 border-t border-default/50 flex items-center justify-between text-[11px] font-mono text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {formattedDate}
          </span>
          {typeof article.claps === 'number' && (
            <span className="flex items-center gap-1 text-accent">
              <Heart size={12} className="fill-accent/20" /> {article.claps}
            </span>
          )}
        </div>

        <span className="flex items-center gap-1 text-secondary group-hover:text-primary transition-colors">
          Ler no Medium <ExternalLink size={10} />
        </span>
      </div>
    </a>
  )
}