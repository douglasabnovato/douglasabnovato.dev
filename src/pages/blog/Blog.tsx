import { useMediumPosts } from '@/entities/article/model/useMediumPosts'
import { ArticleCard } from '@/entities/article/ui/ArticleCard'

export const Blog = () => {
  const { articles, loading, error } = useMediumPosts()

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Blog</h1>
        <p className="text-zinc-400 text-sm">
          Artigos que escrevo no{' '}
          <a href="https://douglasabnovato.medium.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
            Medium
          </a>.
        </p>
      </div>

      {loading && <p className="text-zinc-500 text-sm">Carregando artigos…</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}