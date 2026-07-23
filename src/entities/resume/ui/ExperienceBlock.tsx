import type { Experience } from '../model/types'

interface ExperienceBlockProps {
  title: string
  experiences: Experience[]
}

export const ExperienceBlock = ({ title, experiences }: ExperienceBlockProps) => {
  if (experiences.length === 0) return null

  return (
    <section>
      <h2 className="text-xs uppercase tracking-wide text-muted cv-muted mb-3">{title}</h2>
      <div className="space-y-5">
        {experiences.map((exp) => (
          <div key={exp.id} className="cv-entry">
            <div className="flex items-baseline justify-between">
              <p className="font-medium">{exp.role}</p>
              <p className="text-xs text-muted cv-muted">{exp.period}</p>
            </div>
            <p className="text-sm text-secondary cv-muted mb-1">
              {exp.company}
              {exp.status === 'a confirmar' && (
                <span className="text-amber-500 text-xs ml-2 print:hidden">(status a confirmar)</span>
              )}
            </p>
            {exp.highlights && (
              <ul className="text-sm text-secondary cv-muted list-disc list-inside space-y-0.5 mt-1">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}