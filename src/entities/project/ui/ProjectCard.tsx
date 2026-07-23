import type { CuratedProject } from '../model/types'

interface ProjectCardProps {
  project: CuratedProject
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  if (project.placeholder) {
    return (
      <div className="rounded-xl p-4 border border-dashed border-zinc-700 text-zinc-600">
        <p className="text-sm font-medium">{project.title}</p>
        <p className="text-xs mt-1">Aguardando conteúdo real</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-4 bg-zinc-900/40 border-l-4"
      style={{ borderLeftColor: project.accentColor ?? '#52525b' }}
    >
      <p className="text-sm font-medium">{project.title}</p>
      <p className="text-xs text-zinc-400 mt-1 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-300 hover:text-white underline underline-offset-2"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}