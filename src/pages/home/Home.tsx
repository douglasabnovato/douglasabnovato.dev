import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText, LayoutGrid, Code2, Newspaper, Share2 } from 'lucide-react'
import { resumeData } from '@/entities/resume/model/resume.data'
import { especiais } from '@/entities/project/api/projects.data'

const sections = [
  { to: '/curriculo', label: 'Currículo', icon: FileText },
  { to: '/projetos', label: 'Projetos', icon: LayoutGrid },
  { to: '/codigos', label: 'Códigos', icon: Code2 },
  { to: '/blog', label: 'Blog', icon: Newspaper },
  { to: '/redes-sociais', label: 'Redes sociais', icon: Share2 },
]

export const Home = () => {
  const currentRoles = resumeData.experiences.filter((e) => e.tier === 'atual')

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-default">
        <span className="font-bold text-lg">
          douglasabnovato<span className="text-muted">.dev</span>
        </span>
        <a
          href="https://github.com/douglasabnovato"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-surface flex items-center justify-center hover:bg-surface-solid transition-colors"
          aria-label="Meu GitHub"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      <p className="text-sm text-muted mb-1">Olá, eu sou o</p>
      <h1 className="text-3xl font-bold mb-2">{resumeData.name.split(' ').slice(0, 2).join(' ')}</h1>
      <p className="text-secondary mb-2">{resumeData.headline}</p>
      <p className="text-sm text-muted mb-8">
        {currentRoles.map((role) => `${role.role} — ${role.company}`).join(' · ')}
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {sections.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface hover:bg-surface-solid text-sm transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </div>

      <p className="text-xs uppercase tracking-wide text-muted mb-3">
        Destaques do ecossistema
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {especiais.map((project) => (
          <a
            key={project.id}
            href={project.links[0]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl overflow-hidden bg-surface hover:bg-surface-solid transition-colors"
          >
            <div
              className="relative h-20 flex items-center justify-center"
              style={{ backgroundColor: project.accentColor ?? 'var(--color-text-muted)' }}
            >
              <span className="text-white text-2xl font-bold opacity-90">
                {project.title.charAt(0)}
              </span>
              <ArrowUpRight
                size={16}
                className="absolute top-2 right-2 text-white/80 group-hover:text-white transition-colors"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium">{project.title}</p>
              {project.tag && <p className="text-xs text-muted mt-0.5">{project.tag}</p>}
              <p className="text-xs text-muted mt-1 line-clamp-2">{project.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}