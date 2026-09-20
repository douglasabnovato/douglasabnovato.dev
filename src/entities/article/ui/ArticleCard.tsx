/**
 * Card horizontal de artigo.
 *
 * A capa fica à esquerda em largura fixa para não consumir altura. Quando o
 * artigo não tem imagem no corpo, entra um bloco tipográfico com filete numa
 * das cores de trilha do main.css, escolhida por hash do título — sempre a
 * mesma para o mesmo artigo, nunca aleatória.
 *
 * O acento aparece uma única vez, na numeração da série.
 */

import { Code2 } from "lucide-react";
import type { Article } from "../model/types";
import { relativeTime } from "../model/useMediumPosts";

const TRACKS = [
  "var(--track-desenvolvimento)",
  "var(--track-produto)",
  "var(--track-dados)",
  "var(--track-operacao)",
  "var(--track-educacao)",
  "var(--track-transicao)",
];

const MAX_TAGS = 3;

/** Cor estável derivada do título. */
function trackFor(title: string): string {
  let soma = 0;
  for (let i = 0; i < title.length; i += 1) soma += title.charCodeAt(i);
  return TRACKS[soma % TRACKS.length];
}

export const ArticleCard = ({ article }: { article: Article }) => {
  const tags = article.categories.slice(0, MAX_TAGS);

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[124px] bg-surface border border-default rounded-lg overflow-hidden hover:border-accent transition-colors"
    >
      {article.cover ? (
        <div className="relative w-[120px] shrink-0 border-r border-default overflow-hidden">
          <img
            src={article.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover img-emph-3 group-hover:img-emph-1"
          />
        </div>
      ) : (
        <div
          className="w-[120px] shrink-0 bg-surface-solid border-r border-default flex items-end p-3"
          style={{ borderLeft: `2px solid ${trackFor(article.title)}` }}
        >
          <span className="text-[10px] font-mono text-muted leading-tight break-words">
            {article.categories[0] ?? article.dateLabel}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1 p-4">
        <p className="flex flex-wrap items-center gap-x-1.5 text-[10px] font-mono text-muted">
          {article.seq ? (
            <>
              <span className="text-accent">#{article.seq}</span>
              <span>·</span>
            </>
          ) : null}
          <span>{article.dateLabel}</span>
          <span>·</span>
          <span>{article.readMinutes} min</span>
          {article.hasCode ? (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Code2 size={10} /> código
              </span>
            </>
          ) : null}
        </p>

        <h3 className="mt-2 text-sm font-medium leading-snug text-primary group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.excerpt ? (
          <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        ) : null}

        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-[10px] font-mono text-muted">
          {tags.map((tag) => (
            <span key={tag}>{tag.toLowerCase()}</span>
          ))}
          {article.isoDate ? (
            <span className="ml-auto">{relativeTime(article.isoDate)}</span>
          ) : null}
        </p>
      </div>
    </a>
  );
};

/** Fim do card de artigo. */