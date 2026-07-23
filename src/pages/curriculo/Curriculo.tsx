import { useRef } from 'react'
import { resumeData } from '@/entities/resume/model/resume.data'
import { PdfExportButton } from '@/entities/resume/ui/PdfExportButton'
import { ExperienceBlock } from '@/entities/resume/ui/ExperienceBlock'
import '@/entities/resume/ui/curriculo-print.css'

export const Curriculo = () => {
  const printRef = useRef<HTMLDivElement>(null)

  const atual = resumeData.experiences.filter((e) => e.tier === 'atual')
  const recente = resumeData.experiences.filter((e) => e.tier === 'recente')
  const condensado = resumeData.experiences.filter((e) => e.tier === 'condensado')

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{resumeData.name}</h1>
          <p className="text-zinc-400 text-sm">{resumeData.headline}</p>
        </div>
        <PdfExportButton targetRef={printRef} fileName="douglas-novato-curriculo" />
      </div>

      <div ref={printRef} className="curriculo-print-area grid grid-cols-1 md:grid-cols-3 gap-10">
        <aside className="md:col-span-1 space-y-8">
          <section>
            <h2 className="text-xs uppercase tracking-wide text-zinc-500 cv-muted mb-2">Resumo</h2>
            <p className="text-sm text-zinc-300 leading-relaxed">{resumeData.summary}</p>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-wide text-zinc-500 cv-muted mb-3">Formação</h2>
            <ul className="space-y-3">
              {resumeData.education.map((edu) => (
                <li key={edu.id} className="text-sm cv-entry">
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-zinc-400 cv-muted">{edu.degree}</p>
                  <p className="text-xs text-zinc-500 cv-muted">
                    {edu.period}{!edu.completed ? ' · em andamento' : ''}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xs uppercase tracking-wide text-zinc-500 cv-muted mb-3">Trajetória</h2>
            <ul className="space-y-1">
              {condensado.map((exp) => (
                <li key={exp.id} className="text-xs text-zinc-400 cv-muted cv-entry">
                  <span className="text-zinc-300">{exp.period}</span> — {exp.role}, {exp.company}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <div className="md:col-span-2 space-y-10">
          <ExperienceBlock title="Atual" experiences={atual} />
          <ExperienceBlock title="Experiência recente" experiences={recente} />
        </div>
      </div>
    </div>
  )
}