import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { getFallbackImageFor } from '../model/fallbackImage'
import { relativeTime } from '../model/useProjectCatalog'
import type { CatalogProject } from '../model/types'

function ogImage(repo: string) {
  return `https://opengraph.githubassets.com/1/douglasabnovato/${repo}`
}

/** Card reduzido: imagem à esquerda, dados à direita. Usado no acervo,
 *  nos forks e nos arquivados, onde o volume é alto e o card cheio vira ruído. */
export const ProjectRow = ({ project }: { project: CatalogProject }) => {
  const [src, setSrc] = useState(() => ogImage(project.name))
  const alvo = project.homepage?.trim() ? project.homepage : project.repoUrl

  return (
    <a
      href={alvo}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-md border border-default bg-surface p-2.5 transition-colors hover:border-accent"
    >
      <img
        src={src}
        onError={() => setSrc(getFallbackImageFor(project.name))}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-24 sm:w-28 shrink-0 aspect-[2/1] object-cover object-top rounded bg-surface-solid"
      />

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono text-muted tabular-nums">
          {project.createdYear} · {project.name}
        </p>
        <p className="mt-0.5 text-xs text-primary truncate group-hover:text-accent transition-colors flex items-center gap-1">
          {project.title}
          <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </p>
        <p className="mt-1 text-[10px] font-mono text-muted tabular-nums">
          {project.openIssues > 0 && `${project.openIssues} issues · `}
          {relativeTime(project.pushedAt)}
        </p>
      </div>
    </a>
  )
}