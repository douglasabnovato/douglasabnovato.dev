import type { CuratedProject, ProjectStatus, ProjectType } from '../model/types'

interface ProjectCardProps {
  project: CuratedProject
  numero?: number
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  mvp: { label: 'MVP', className: 'bg-emerald-500/90 text-white' },
  'em-desenvolvimento': { label: 'Em desenvolvimento', className: 'bg-amber-500/90 text-white' },
}

const tipoLabels: Record<ProjectType, string> = {
  educacional: 'Educacional',
  'site-institucional': 'Site institucional',
  'lp-de-produto': 'LP de produto',
  financeiro: 'Financeiro',
  utilitario: 'Utilitário',
  projeto: 'Projeto',
}

function getRepoImage(project: CuratedProject): string {
  const repoLink = project.links.find((l) => l.url.includes('github.com'))
  const match = repoLink?.url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (match) {
    const [, owner, repo] = match
    return `https://opengraph.githubassets.com/1/${owner}/${repo}`
  }
  return `https://placehold.co/600x400/e4e4e7/71717a?text=${encodeURIComponent(project.title)}`
}

export const ProjectCard = ({ project, numero }: ProjectCardProps) => {
  if (project.placeholder) {
    return (
      <div className="rounded-xl p-4 border border-dashed border-default text-muted">
        {numero !== undefined && (
          <span className="text-[10px] font-mono">#{String(numero).padStart(2, '0')}</span>
        )}
        <p className="text-sm font-medium">{project.title}</p>
        <p className="text-xs mt-1">Aguardando conteúdo real</p>
      </div>
    )
  }

  const fallbackImage = `https://placehold.co/600x400/e4e4e7/71717a?text=${encodeURIComponent(project.title)}`

  return (
    <div className="rounded-xl overflow-hidden bg-surface">
      <div className="relative">
        <img
          src={getRepoImage(project)}
          alt={project.title}
          className="w-full h-32 object-cover bg-surface-solid"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = fallbackImage
          }}
        />
        {numero !== undefined && (
          <span className="absolute top-2 left-2 bg-white/85 backdrop-blur-sm text-[10px] font-mono text-zinc-700 px-2 py-0.5 rounded-full">
            #{String(numero).padStart(2, '0')}
          </span>
        )}
        {project.status && (
          <span className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${statusConfig[project.status].className}`}>
            {statusConfig[project.status].label}
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-sm font-medium">{project.title}</p>
        {project.tipo && <p className="text-xs text-muted mt-0.5">{tipoLabels[project.tipo]}</p>}
        {project.tag && <p className="text-xs text-muted">{project.tag}</p>}
        <p className="text-xs text-secondary mt-1 mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.links.map((link) =>
            link.hospedado ? (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <a 
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-secondary hover:text-primary underline underline-offset-2"
              >
                {link.label}
              </a>
            )
          )}
        </div>
      </div>
    </div>
  )
}