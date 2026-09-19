import { managementBoards } from '@/entities/project/api/projects.data'
import { ManagementBoardCard } from '@/entities/project/ui/ManagementBoardCard'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import { ProjectRow } from '@/entities/project/ui/ProjectRow'
import { useProjectCatalog } from '@/entities/project/model/useProjectCatalog'
import type { ProjectSectionId } from '@/entities/project/model/types'

/** Seções que usam card reduzido, por volume. */
const COMPACTAS: ProjectSectionId[] = ['projetos', 'forks', 'arquivados']

const DESCRICAO: Partial<Record<ProjectSectionId, string>> = {
  forks: 'Repositórios de terceiros que acompanho ou estudo.',
  arquivados: 'Trabalhos encerrados, mantidos como registro.',
}

const SectionHead = ({ title, total, nota }: { title: string; total: number; nota?: string }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pb-2 mb-5 border-b border-default">
    <h2 className="text-[11px] font-mono uppercase tracking-[0.14em] text-secondary">
      {title} <span className="text-muted tabular-nums">· {total}</span>
    </h2>
    {nota && <span className="text-[10px] font-mono text-muted">{nota}</span>}
  </div>
)

export const Projetos = () => {
  const { sections, indicators, state } = useProjectCatalog()

  return (
    <div className="max-w-4xl pb-24">
      {/* ---------- CABEÇALHO ---------- */}
      <header className="pb-8 border-b border-default">
        <span className="block text-[10px] font-mono uppercase tracking-[0.14em] text-muted">
          Projetos
        </span>
        <h1 className="mt-1.5 text-2xl font-medium tracking-tight text-primary">
          Repositórios e gestão de produto
        </h1>
        <p className="mt-3 text-sm text-secondary leading-relaxed max-w-xl">
          Catálogo lido ao vivo da API do GitHub. Cada repositório traz o ano de criação, as
          issues abertas e a data da última atualização.
        </p>
      </header>

      {/* ---------- INDICADORES ---------- */}
      <section className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[color:var(--color-border)] border-b border-default">
        {[
          { valor: indicators.repositorios, label: 'repositórios' },
          { valor: indicators.ativos30d, label: 'ativos nos últimos 30 dias' },
          { valor: indicators.issuesAbertas, label: 'issues abertas' },
          { valor: indicators.noAr, label: 'com link em produção' },
        ].map((item) => (
          <div key={item.label} className="px-4 py-6 first:pl-0">
            <span className="block text-3xl font-mono tabular-nums text-primary">
              {state === 'loading' ? '—' : item.valor}
            </span>
            <span className="block text-[11px] text-secondary mt-2 leading-snug">{item.label}</span>
          </div>
        ))}
      </section>

      {state === 'error' && (
        <p className="mt-6 text-xs text-muted">
          Limite de requisições da API do GitHub atingido. Os dados voltam em alguns minutos.
        </p>
      )}
      {state === 'stale' && (
        <p className="mt-6 text-[10px] font-mono text-muted">Exibindo dados em cache.</p>
      )}

      {/* ---------- GESTÃO DE PROJETOS ---------- */}
      <section className="mt-[var(--space-block)]">
        <SectionHead title="Gestão de projetos" total={managementBoards.length} />
        <div className="space-y-4">
          {managementBoards.map((board) => (
            <ManagementBoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>

      {/* ---------- CATÁLOGO ---------- */}
      {sections.map((secao) => (
        <section key={secao.id} id={secao.id} className="mt-[var(--space-block)]">
          <SectionHead title={secao.label} total={secao.total} nota={DESCRICAO[secao.id]} />

          {COMPACTAS.includes(secao.id) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {secao.items.map((p) => (
                <ProjectRow key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {secao.items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}