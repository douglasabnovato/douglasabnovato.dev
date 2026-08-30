import { profileRepo, especiais, destaques, mvpRepos, projetosOriginais, managementBoards } from '@/entities/project/api/projects.data'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import { ManagementBoardCard } from '@/entities/project/ui/ManagementBoardCard'
import { useGithubEnrichment, enrichProject } from '@/entities/project/model/useGithubEnrichment'

const secoes = [
  { id: 'profile', label: 'Profile (1)', items: profileRepo },
  { id: 'especiais', label: 'Especiais (5)', items: especiais },
  { id: 'destaques', label: 'Top Destaques (3)', items: destaques },
  { id: 'mvp', label: 'MVP & Aplicações (15)', items: mvpRepos },
  { id: 'projetos', label: 'Projetos (30)', items: projetosOriginais },
]

export const Projetos = () => {
  const { enrichment } = useGithubEnrichment()

  let contador = 0
  const secoesNumeradas = secoes.map((secao) => ({
    ...secao,
    numerados: secao.items.map((item) => {
      contador += 1
      return { item: enrichProject(item, enrichment), numero: contador }
    }),
  }))

  const totalProjetos = secoes.reduce((total, s) => total + s.items.length, 0)

  return (
    <div className="max-w-4xl space-y-12">
      {/* CABEÇALHO */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-default mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono text-accent px-2 py-0.5 rounded border border-accent/20 bg-accent/5">
              Produtos & Soluções Digitais
            </span>
            <span className="text-[10px] font-mono text-muted">
              v2.6
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Projetos & Repositórios</h1>
          <p className="text-secondary text-sm mt-1 max-w-xl leading-relaxed">
            Catálogo completo de produtos digitais, MVPs funcionais e soluções organizadas por frentes estratégicas de tecnologia.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-surface border border-default px-4 py-2.5 rounded-lg self-start md:self-auto">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <div>
            <p className="text-xs font-mono text-muted uppercase tracking-wider">Catálogo Oficial</p>
            <p className="text-sm font-bold text-primary font-mono">
              {totalProjetos} <span className="text-xs font-normal text-secondary font-sans">projetos catalogados</span>
            </p>
          </div>
        </div>
      </div>

      {/* SEÇÃO: QUADROS DE GESTÃO */}
      <section id="gestao-de-projetos">
        <h2 className="text-xs uppercase tracking-wide text-muted mb-3 font-mono font-semibold">Gestão de Projetos</h2>
        <div className="grid grid-cols-1 gap-3">
          {managementBoards.map((board) => (
            <ManagementBoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>

      {/* SEÇÕES DE PROJETOS NUMERADAS DE 1 A 54 */}
      {secoesNumeradas.map((secao) => (
        <section key={secao.id} id={secao.id}>
          <h2 className="text-xs uppercase tracking-wide text-muted mb-3 font-mono font-semibold">
            {secao.label}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {secao.numerados.map(({ item, numero }) => (
              <ProjectCard key={item.id} project={item} numero={numero} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}