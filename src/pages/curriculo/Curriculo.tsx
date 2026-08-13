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
    <div className="max-w-4xl pb-16">
      {/* HEADER RESPONSIVO (Nome, Headline e Botão Organizados) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-default">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">{resumeData.name}</h1>
          <p className="text-secondary text-xs sm:text-sm mt-1 leading-relaxed">{resumeData.headline}</p>
        </div>
        <div className="self-start sm:self-auto">
          <PdfExportButton targetRef={printRef} fileName="douglas-novato-curriculo" />
        </div>
      </div>

      {/* ÁREA DO CURRÍCULO (Grid Otimizado) */}
      <div ref={printRef} className="curriculo-print-area grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ASIDE / COLUNA LATERAL */}
        <aside className="md:col-span-1 space-y-6">
          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-2">Resumo</h2>
            <p className="text-xs text-secondary leading-relaxed">{resumeData.summary}</p>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-3">Formação</h2>
            <ul className="space-y-3">
              {resumeData.education.map((edu) => (
                <li key={edu.id} className="text-xs cv-entry border-b border-default/40 pb-2.5 last:border-0 last:pb-0">
                  <p className="font-semibold text-primary">{edu.institution}</p>
                  <p className="text-secondary cv-muted mt-0.5">{edu.degree}</p>
                  <p className="text-[11px] font-mono text-muted cv-muted mt-1">
                    {edu.period}{!edu.completed ? ' · em andamento' : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-surface border border-default">
            <h2 className="text-[11px] uppercase tracking-widest font-mono text-accent mb-3">Trajetória</h2>
            <ul className="space-y-2.5">
              {condensado.map((exp) => (
                <li key={exp.id} className="text-xs text-secondary cv-muted cv-entry leading-relaxed">
                  <span className="font-mono text-[10px] text-accent block">{exp.period}</span>
                  <span className="text-primary font-medium">{exp.role}</span>
                  <span className="text-muted"> — {exp.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL (Experiências Atuais e Recentes) */}
        <div className="md:col-span-2 space-y-8">
          <div className="p-4 sm:p-6 rounded-lg bg-surface border border-default">
            <ExperienceBlock title="Atual" experiences={atual} />
          </div>
          <div className="p-4 sm:p-6 rounded-lg bg-surface border border-default">
            <ExperienceBlock title="Experiência recente" experiences={recente} />
          </div>
        </div>

      </div>
    </div>
  )
}