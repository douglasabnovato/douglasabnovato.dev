/**
 * Página Blog.
 *
 * Mesma gramática de Projetos: número verificável no topo, amostra abaixo,
 * link para o conjunto completo. O feed do Medium entrega no máximo 10 itens,
 * e o total real vem de blog.data.ts.
 *
 * Indicadores e linhas editoriais só renderizam quando têm dado. Com o
 * arquivo de dados zerado, a página não exibe número algum.
 */

import { ArrowUpRight } from "lucide-react";
import { useMediumPosts, relativeTime } from "@/entities/article/model/useMediumPosts";
import { ArticleCard } from "@/entities/article/ui/ArticleCard";
import { blogMeta, blogIntro, MEDIUM_PROFILE } from "@/entities/article/api/blog.data";

export const Blog = () => {
  const { articles, state } = useMediumPosts();
  const linhas = blogMeta.editorial.filter((linha) => linha.active);
  const ultimo = articles[0];

  const indicadores = [
    blogMeta.mediumTotal > 0
      ? { valor: String(blogMeta.mediumTotal), label: "artigos publicados" }
      : null,
    blogMeta.mediumSince > 0
      ? { valor: String(blogMeta.mediumSince), label: "escrevendo desde" }
      : null,
    ultimo ? { valor: relativeTime(ultimo.isoDate), label: "última publicação" } : null,
  ].filter(Boolean) as { valor: string; label: string }[];

  const rotuloAmostra =
    blogMeta.mediumTotal > 0
      ? `${articles.length} de ${blogMeta.mediumTotal}`
      : String(articles.length);

  return (
    <div className="max-w-4xl pb-24">
      <header className="pb-8 border-b border-default">
        <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
          Blog
        </span>
        <h1 className="mt-1.5 text-2xl font-medium tracking-tight text-primary">
          Artigos e ponto de vista
        </h1>
        <p className="mt-3 text-sm text-secondary leading-relaxed max-w-xl">{blogIntro}</p>
      </header>

      {indicadores.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--color-border)] border-b border-default">
          {indicadores.map((item) => (
            <div key={item.label} className="px-4 py-6 first:pl-0">
              <span className="block text-3xl font-mono tabular-nums text-primary">
                {item.valor}
              </span>
              <span className="block text-[11px] text-secondary mt-2 leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </section>
      )}

      {linhas.length > 0 && (
        <section className="mt-[var(--space-block)]">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary pb-2 border-b border-default">
            Linhas editoriais
          </h2>
          <div className="mt-[var(--space-group)] grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
            {linhas.map((linha) => (
              <div key={linha.id} className="border-l border-default pl-4">
                <h3 className="text-sm font-medium text-primary">{linha.title}</h3>
                <p className="mt-1.5 text-xs text-muted leading-relaxed">{linha.scope}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-[var(--space-block)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 mb-5 border-b border-default">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
            Últimos artigos <span className="text-muted tabular-nums">· {rotuloAmostra}</span>
          </h2>
          <a
            href={MEDIUM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-secondary hover:text-accent transition-colors"
          >
            Ver todos no Medium <ArrowUpRight size={11} />
          </a>
        </div>

        {state === "loading" && (
          <p className="text-xs font-mono text-muted">Carregando artigos…</p>
        )}

        {state === "error" && (
          <p className="text-xs text-muted leading-relaxed">
            Não foi possível ler o feed do Medium agora. Os artigos continuam disponíveis no
            perfil.
          </p>
        )}

        {state === "ok" && articles.length === 0 && (
          <p className="text-xs text-muted leading-relaxed">
            O feed não retornou artigos neste momento.
          </p>
        )}

        {state === "stale" && (
          <p className="mb-4 text-[10px] font-mono text-muted">Exibindo dados em cache.</p>
        )}

        {articles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      {blogMeta.priorOutlet && (
        <section className="mt-[var(--space-block)] pt-6 border-t border-default">
          <p className="text-xs text-muted leading-relaxed">
            Antes do Medium:{" "}
            {blogMeta.priorOutlet.count > 0
              ? `${blogMeta.priorOutlet.count} artigos como colunista`
              : "colunista"}{" "}
            de tecnologia na {blogMeta.priorOutlet.outlet}, {blogMeta.priorOutlet.period}.
          </p>
        </section>
      )}
    </div>
  );
};

/** Fim da página Blog. */