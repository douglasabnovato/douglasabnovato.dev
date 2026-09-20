/**
 * Página Blog.
 *
 * Três blocos: cabeçalho, painel do acervo e os artigos recentes.
 *
 * O painel usa números apurados uma vez, em blog.data.ts. Os artigos vêm
 * vivos do feed do Medium, que entrega no máximo dez — não há paginação
 * porque não há mais nada para paginar.
 */

import { ArrowUpRight } from "lucide-react";
import { useMediumPosts, relativeTime } from "@/entities/article/model/useMediumPosts";
import { ArticleCard } from "@/entities/article/ui/ArticleCard";
import { BlogDashboard } from "@/entities/article/ui/BlogDashboard";
import { blogIntro, blogMeta, MEDIUM_PROFILE } from "@/entities/article/api/blog.data";

export const Blog = () => {
  const { articles, state } = useMediumPosts();
  const ultimo = articles[0];
  const publicadoEm = ultimo ? relativeTime(ultimo.isoDate) : undefined;

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

      <BlogDashboard lastPublished={publicadoEm} />

      <section className="mt-[var(--space-block)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 mb-5 border-b border-default">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
            Publicados recentemente{" "}
            <span className="text-muted tabular-nums">
              · {articles.length} de {blogMeta.mediumTotal}
            </span>
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
            Os {blogMeta.priorOutlet.count} artigos mais antigos do acervo foram publicados
            originalmente como coluna de tecnologia na {blogMeta.priorOutlet.outlet}, entre{" "}
            {blogMeta.priorOutlet.period}, e depois importados para o Medium com as datas de
            origem.
          </p>
        </section>
      )}
    </div>
  );
};

/** Fim da página Blog. */