import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getFallbackImageFor } from '../model/fallbackImage'
import { relativeTime } from '../model/useProjectCatalog'
import type { CatalogProject } from '../model/types'

/**
 * Cartão OpenGraph do próprio GitHub: existe para todo repositório público e
 * mostra nome, descrição e linguagem. Quando o repositório define uma imagem
 * em Settings → Social preview, este mesmo endereço passa a devolvê-la — o
 * card melhora sozinho, sem tocar no código.
 */
function ogImage(repo: string) {
  return `https://opengraph.githubassets.com/1/douglasabnovato/${repo}`
}

interface ProjectCardProps {
  project: CatalogProject
  compact?: boolean
}

export const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  const [src, setSrc] = useState(() => ogImage(project.name))

  const alvo = project.homepage?.trim() ? project.homepage : project.repoUrl

  return (
    <article className="group flex flex-col rounded-lg border border-default bg-surface overflow-hidden transition-colors hover:border-accent">
      <a href={alvo} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={src}
          onError={() => setSrc(getFallbackImageFor(project.name))}
          alt={`Cartão do repositório ${project.name}`}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[2/1] object-cover object-top bg-surface-solid"
        />
      </a>

      <div className={compact ? 'p-3.5 flex-1 flex flex-col' : 'p-5 flex-1 flex flex-col'}>
        {/* identidade */}
        <p className="text-[10px] font-mono text-muted tabular-nums">
          {project.createdYear} · {project.name}
        </p>

        <h3 className="mt-1 text-sm font-medium text-primary">
<a
          href={alvo}
          target="_blank"
          rel="noopener noreferrer"
          className="group-hover:text-accent transition-colors"
          >
          {project.title}
        </a>
      </h3>

      {project.tag && <p className="mt-0.5 text-[11px] font-mono text-muted">{project.tag}</p>}

      {project.description && (
        <p className="mt-2 text-xs text-secondary leading-relaxed line-clamp-3">
          {project.description}
        </p>
      )}

      {/* etiquetas de tecnologia, vindas dos topics do GitHub */}
      {project.techTopics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
          {project.techTopics.slice(0, 4).map((topic) => (
            <span key={topic} className="text-[10px] font-mono text-muted">
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* atividade */}
      <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-muted tabular-nums">
        {project.commits !== undefined && <span>{project.commits} commits</span>}
        {project.openIssues > 0 && <span>{project.openIssues} issues abertas</span>}
        <span>atualizado {relativeTime(project.pushedAt)}</span>
        {project.isCourse && <span className="text-secondary">material de curso</span>}
      </div>

      {/* ações */}
      <div className="mt-3 pt-3 border-t border-default flex flex-wrap items-center gap-x-4 gap-y-2">
        {project.homepage?.trim() && (
<a
          href = { project.homepage }
              target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
            >
        No ar <ArrowUpRight size={11} />
      </a>
          )}
<a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] font-mono text-secondary hover:text-accent transition-colors"
          >
      Código <ArrowUpRight size={11} />
    </a>
        </div >
      </div >
    </article >
  )
}