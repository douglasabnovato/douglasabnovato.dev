import { especiais, destaques, demaisProjetos } from '@/entities/project/api/projects.data'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import type { ProjectCategory } from '@/entities/project/model/types'

const outrasCategorias: { key: ProjectCategory; label: string }[] = [
  { key: 'projetos-originais', label: 'Projetos Originais' },
  { key: 'formacao-projetos', label: 'Formação Projetos' },
  { key: 'formacao-conteudos', label: 'Formação Conteúdos' },
  { key: 'templates-institucionais', label: 'Templates Institucionais' },
]

export const Projetos = () => {
  return (
    <div className="max-w-4xl space-y-12">
      <section>
        <h1 className="text-2xl font-bold mb-1">Projetos</h1>
        <p className="text-zinc-400 text-sm mb-6">O ecossistema e os projetos que venho construindo.</p>

        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Especiais</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {especiais.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Destaques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {destaques.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {outrasCategorias.map(({ key, label }) => {
        const items = demaisProjetos.filter((p) => p.category === key)
        return (
          <section key={key}>
            <h2 className="text-xs uppercase tracking-wide text-zinc-500 mb-3">{label}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {items.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}