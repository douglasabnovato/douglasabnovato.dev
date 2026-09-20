/**
 * Painel do acervo de artigos.
 *
 * Só lê dados de blog.data.ts — não busca nada, não tem estado. Os gráficos
 * são divs com largura e altura proporcionais; não há biblioteca de gráfico
 * porque treze barras não justificam mais de cem kilobytes no bundle.
 *
 * As conclusões ficam neste arquivo, e não no de dados, porque cada uma se
 * refere a um painel específico logo acima dela.
 */

import {
  blogMeta,
  blogMethod,
  blogMethodNotes,
  blogCurveNote,
  blogClosing,
} from "../api/blog.data";

const COR: Record<string, string> = {
  tecnologia: "var(--track-produto)",
  carreira: "var(--track-desenvolvimento)",
  fundamentos: "var(--track-educacao)",
  frontend: "var(--track-dados)",
  backend: "var(--track-operacao)",
  ferramentas: "var(--track-transicao)",
  jornalismo: "var(--color-text-muted)",
};

const CONCLUSOES = [
  "Três artigos somam 79 mil visualizações — 48% do alcance vem de 1,2% do acervo.",
  "Texto técnico segura quem abre: 49,2% de leitura em frontend e 47,1% em backend, contra 38,5% em carreira.",
  "215 dos 257 artigos têm até oito minutos de leitura.",
];

/** 165601 vira "165,6 mil"; abaixo de mil, o número inteiro. */
function compacto(n: number): string {
  if (n < 1000) return String(n);
  const mil = n / 1000;
  const texto = mil % 1 === 0 ? String(mil) : mil.toFixed(1);
  return `${texto.replace(".", ",")} mil`;
}

/** Cabeçalho de seção no mesmo padrão das outras páginas. */
const Titulo = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary pb-2 mb-5 border-b border-default">
    {children}
  </h3>
);

export const BlogDashboard = ({ lastPublished }: { lastPublished?: string }) => {
  const { yearly, topics, topRead, mediumTotal, mediumSince, totalViews, totalReads, totalMinutes } =
    blogMeta;

  const maxAno = Math.max(...yearly.map((a) => a.count));
  const maxGrupo = Math.max(...topics.map((g) => g.count));

  const numeros = [
    { valor: String(mediumTotal), rotulo: "artigos publicados" },
    { valor: compacto(totalViews), rotulo: "visualizações" },
    { valor: compacto(totalReads), rotulo: "leituras completas" },
    { valor: `${(totalMinutes / 60).toFixed(1).replace(".", ",")} h`, rotulo: "de leitura somada" },
  ];

  return (
    <section className="mt-[var(--space-block)]">
      <p className="text-sm text-secondary leading-relaxed max-w-2xl pb-6 border-b border-default">
        {blogMethod}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[color:var(--color-border)] border-b border-default">
        {numeros.map((item) => (
          <div key={item.rotulo} className="px-4 py-6 first:pl-0">
            <span className="block text-3xl font-mono tabular-nums text-primary">{item.valor}</span>
            <span className="block text-[11px] text-secondary mt-2 leading-snug">{item.rotulo}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[10px] font-mono text-muted">
        desde {mediumSince}
        {lastPublished ? ` · última publicação ${lastPublished}` : ""}
      </p>

      <div className="mt-[var(--space-group)]">
        <Titulo>Volume por ano</Titulo>

        <div className="flex items-end gap-1.5 h-36 border-b border-default">
          {yearly.map((ano) => (
            <div key={ano.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[9px] font-mono tabular-nums text-muted mb-1">{ano.count}</span>
              <div
                className="w-full bg-accent rounded-t-sm"
                style={{ height: `${(ano.count / maxAno) * 100}%` }}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-1.5 mt-2">
          {yearly.map((ano) => (
            <span
              key={ano.year}
              className="flex-1 text-center text-[9px] font-mono tabular-nums text-muted"
            >
              {String(ano.year).slice(2)}
            </span>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted leading-relaxed max-w-2xl border-l border-default pl-3">
          {blogCurveNote}
        </p>
      </div>

      <div className="mt-[var(--space-group)]">
        <Titulo>Assuntos</Titulo>

        <div className="space-y-5">
          {topics.map((grupo) => (
            <div key={grupo.id}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs text-primary">{grupo.label}</span>
                <span className="text-[10px] font-mono tabular-nums text-muted shrink-0">
                  {grupo.count} artigos · {compacto(grupo.views)} views ·{" "}
                  {String(grupo.readRate).replace(".", ",")}% lidos
                </span>
              </div>

              <div className="mt-2 h-1.5 rounded-full bg-surface-solid overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(grupo.count / maxGrupo) * 100}%`,
                    backgroundColor: COR[grupo.id],
                  }}
                />
              </div>

              {grupo.note ? (
                <p className="mt-1.5 text-[10px] text-muted leading-snug">{grupo.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[var(--space-group)]">
        <Titulo>Mais lidos</Titulo>

        <ul>
          {topRead.map((artigo, indice) => (
            <li
              key={artigo.title}
              className="flex items-baseline gap-3 py-2.5 border-b border-default last:border-0"
            >
              <span className="w-4 shrink-0 text-[10px] font-mono tabular-nums text-muted">
                {indice + 1}
              </span>
              <span className="flex-1 min-w-0 text-xs text-primary leading-snug">
                {artigo.title}
              </span>
              <span className="shrink-0 text-[10px] font-mono tabular-nums text-muted">
                {artigo.year}
              </span>
              <span className="shrink-0 w-16 text-right text-[10px] font-mono tabular-nums text-secondary">
                {compacto(artigo.views)}
              </span>
              <span className="shrink-0 w-12 text-right text-[10px] font-mono tabular-nums text-muted">
                {Math.round((artigo.reads / artigo.views) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[var(--space-group)] grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <Titulo>Leitura</Titulo>
          <ol className="space-y-3">
            {CONCLUSOES.map((texto, indice) => (
              <li key={texto} className="flex gap-3 text-xs text-secondary leading-relaxed">
                <span className="font-mono tabular-nums text-muted shrink-0">{indice + 1}</span>
                {texto}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <Titulo>Nota de método</Titulo>
          <div className="space-y-3">
            {blogMethodNotes.map((nota) => (
              <p key={nota} className="text-xs text-muted leading-relaxed">
                {nota}
              </p>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-[var(--space-group)] text-sm text-secondary leading-relaxed max-w-2xl border-l border-accent pl-4">
        {blogClosing}
      </p>
    </section>
  );
};

/** Fim do painel do acervo. */