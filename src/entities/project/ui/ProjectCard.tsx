import { useMemo } from 'react'
import { getRandomFallbackImage } from '../model/fallbackImage'
import type { CuratedProject, ProjectStatus, ProjectType } from '../model/types'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: CuratedProject
  numero?: number
}

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  mvp: { label: 'MVP', className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  'em-desenvolvimento': { label: 'Em desenvolvimento', className: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
}

const tipoLabels: Record<ProjectType, string> = {
  educacional: 'Educacional',
  'site-institucional': 'Site institucional',
  'lp-de-produto': 'LP de produto',
  financeiro: 'Financeiro',
  utilitario: 'Utilitário',
  projeto: 'Projeto',
}

export const ProjectCard = ({ project, numero }: ProjectCardProps) => {
  const cardImage = useMemo(() => getRandomFallbackImage(), [])

  if (project.placeholder) {
    return (
      <div className="rounded-lg p-5 border border-dashed border-default bg-surface/30 text-muted transition-all duration-300">
        {numero !== undefined && (
          <span className="text-[10px] font-mono text-muted/60">#{String(numero).padStart(2, '0')}</span>
        )}
        <p className="text-sm font-medium text-secondary mt-1">{project.title}</p>
        <p className="text-xs text-muted/80 mt-0.5">Aguardando conteúdo real</p>
      </div>
    )
  }

  return (
    <div className="group rounded-lg overflow-hidden bg-surface border border-default hover:border-accent transition-all duration-400 relative">
      {/* Detalhe de precisão lateral no hover */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

      <div className="relative overflow-hidden aspect-video">
        <img
          src={cardImage}
          alt={project.title}
          className="w-full h-full object-cover bg-surface-solid opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-60" />

        {numero !== undefined && (
          <span className="absolute top-3 left-3 bg-[#09090b]/80 backdrop-blur-md text-[10px] font-mono text-secondary px-2.5 py-1 rounded border border-default">
            #{String(numero).padStart(2, '0')}
          </span>
        )}
        {project.status && (
          <span className={`absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded ${statusConfig[project.status].className}`}>
            {statusConfig[project.status].label}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-primary tracking-tight">{project.title}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {project.tipo && <span className="text-[11px] font-mono text-muted">{tipoLabels[project.tipo]}</span>}
          {project.tag && (
            <>
              <span className="text-muted">•</span>
              <span className="text-[11px] font-mono text-muted">{project.tag}</span>
            </>
          )}
        </div>

        <p className="text-xs text-secondary leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-default/50">
          {project.links.map((link) =>
            link.hospedado ? (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                {link.label}
                <ArrowUpRight size={12} />
              </a>
            ) : (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-secondary hover:text-primary transition-colors font-mono"
              >
                {link.label} <span className="text-muted">↗</span>
              </a>
            )
          )}
          {project.issuesAbertas !== undefined && (
            <span className="text-[10px] text-muted font-mono ml-auto" title="Issues abertas">
              is: {project.issuesAbertas}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}