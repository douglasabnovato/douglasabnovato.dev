// src/pages/home/Home.tsx
import { resumeData } from '@/entities/resume/model/resume.data'
import { featuredProjects } from '@/entities/project/api/projects.data'

export const Home = () => {
  const currentRoles = resumeData.experiences.filter((e) => e.tier === 'atual')

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-zinc-500 mb-1">Olá, eu sou o</p>
      <h1 className="text-3xl font-bold mb-2">{resumeData.name.split(' ').slice(0, 2).join(' ')}</h1>
      <p className="text-zinc-400 mb-2">{resumeData.headline}</p>
      <p className="text-sm text-zinc-500 mb-10">
        {currentRoles.map((role) => `${role.role} — ${role.company}`).join(' · ')}
      </p>

      <p className="text-xs uppercase tracking-wide text-zinc-500 mb-3">
        Destaques do ecossistema
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {featuredProjects.map((project) => (          
          <a  
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-zinc-900/40 rounded-xl p-4 border-l-4 hover:bg-zinc-900/70 transition-colors"
            style={{ borderLeftColor: project.accentColor ?? '#52525b' }}
          >
            <p className="text-sm font-medium">{project.title}</p>
            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}