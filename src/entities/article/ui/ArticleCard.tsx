import type { Article } from '../model/types'

interface ArticleCardProps {
  article: Article
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
      className="block bg-zinc-900/40 rounded-xl p-4 hover:bg-zinc-900/70 transition-colors"
    >
      <p className="text-xs text-zinc-500 mb-1">{formattedDate}</p>
      <p className="text-sm font-medium mb-1">{article.title}</p>
      <p className="text-xs text-zinc-400 line-clamp-2">{article.description}</p>
    </a>
  )
}