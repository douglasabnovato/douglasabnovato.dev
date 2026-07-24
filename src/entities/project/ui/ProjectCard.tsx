import type { CuratedProject, ProjectStatus, ProjectType } from '../model/types'

interface ProjectCardProps {
  project: CuratedProject
  numero?: number
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  mvp: { label: 'MVP', className: 'bg-emerald-500/15 text-emerald-500' },
  'em-desenvolvimento': { label: 'Em desenvolvimento', className: 'bg-amber-500/15 text-amber-500' },
}

const tipoLabels: Record<ProjectType, string> = {
  educacional: 'Educacional',
  'site-institucional': 'Site institucional',
  'lp-de-produto': 'LP de produto',
  financeiro: 'Financeiro',
  utilitario: 'Utilitário',
}

export const ProjectCard = ({ project, numero }: ProjectCardProps) => {
  if (project.placeholder) {
    return (
      <div className="rounded-xl p-4 border border-dashed border-default text-muted">
        {numero !== undefined && <span className="text-[10px] font-mono">#{String(numero).padStart(2, '0')}</span>}
        <p className="text-sm font-medium">{project.title}</p>
        <p className="text-xs mt-1">Aguardando conteúdo real</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-4 bg-surface border-l-4"
      style={{ borderLeftColor: project.accentColor ?? 'var(--color-text-muted)' }}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          {numero !== undefined && (
            <span className="text-[10px] text-muted font-mono">#{String(numero).padStart(2, '0')}</span>
          )}
          <p className="text-sm font-medium">{project.title}</p>
        </div>
        {project.status && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusConfig[project.status].className}`}>
            {statusConfig[project.status].label}
          </span>
        )}
      </div>

      {project.tipo && (
        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border border-default text-muted mb-1">
          {tipoLabels[project.tipo]}
        </span>
      )}

      {project.tag && <p className="text-xs text-muted mt-0.5">{project.tag}</p>}
      <p className="text-xs text-secondary mt-1 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-secondary hover:text-primary underline underline-offset-2"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}