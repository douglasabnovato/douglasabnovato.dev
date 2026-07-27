import { especiais, destaques, projetosOriginais, formacaoProjetos, formacaoConteudos, templatesInstitucionais, managementBoards } from '@/entities/project/api/projects.data'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import { ManagementBoardCard } from '@/entities/project/ui/ManagementBoardCard'
import { useGithubEnrichment, enrichProject } from '@/entities/project/model/useGithubEnrichment'

const secoes = [
  { id: 'especiais', label: 'Especiais', items: especiais },
  { id: 'destaques', label: 'Destaques', items: destaques },
  { id: 'projetos-originais', label: 'Projetos Originais', items: projetosOriginais },
  { id: 'formacao-projetos', label: 'Formação Projetos', items: formacaoProjetos },
  { id: 'formacao-conteudos', label: 'Formação Conteúdos', items: formacaoConteudos },
  { id: 'templates-institucionais', label: 'Templates Institucionais', items: templatesInstitucionais },
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
      <div>
        <h1 className="text-2xl font-bold mb-1">Projetos</h1>
        <p className="text-secondary text-sm">O ecossistema e os projetos que venho construindo.</p>
        <p className="text-xs text-muted mt-1">{totalProjetos} projetos exibidos</p>
      </div>

      <section id="gestao-de-projetos">
        <h2 className="text-xs uppercase tracking-wide text-muted mb-3">Gestão de Projetos</h2>
        <div className="grid grid-cols-1 gap-3">
          {managementBoards.map((board) => (
            <ManagementBoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>

      {secoesNumeradas.map((secao) => (
        <section key={secao.id} id={secao.id}>
          <h2 className="text-xs uppercase tracking-wide text-muted mb-3">{secao.label}</h2>
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